import 'isomorphic-fetch';
import { stringify } from 'querystring';

const fullPackage = /^(@[a-zA-Z0-9-]+\/)?([a-zA-Z0-9-]+)(@(\d.\d.\d))?$/;
const partialPackage = /^(@[a-zA-Z0-9-]+\/)?([a-zA-Z0-9-]+)@([\d.]*|l|la|lat|late|lates|latest)$/;
//const endpoint = 'http://localhost:3001';
const endpoint = 'https://nriy2mztj9.execute-api.eu-central-1.amazonaws.com/dev';

const resolvePackage = pkg => {
  if (!fullPackage.test(pkg)) throw new Error('Invalid package name');
  const [, scope = '', name, , version] = fullPackage.exec(pkg);
  return { name: scope + name, version };
};

export const resolvePartialPackage = pkg => {
  if (!partialPackage.test(pkg)) return { name: pkg, version: null };
  const [, scope = '', name, version] = partialPackage.exec(pkg);
  return { name: scope + name, version };
};

const prepareQuery = query => stringify(JSON.parse(JSON.stringify(query)));

const invoke = method => async (path, { query = {}, body }) => {
  const response = await fetch(`${endpoint}/${path}?${prepareQuery(query)}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  try {
    const json = await response.json();
    if (!response.ok) throw new Error(json.message);
    return json;
  } catch (error) {
    throw error;
  }
};

const api = {
  get: invoke('GET'),
  post: invoke('POST'),
  put: invoke('PUT'),
  delete: invoke('DELETE')
};

export const validateByName = name => api.get('validation', { query: resolvePackage(name) });

export const validateByJson = (packageJSON, isProduction = false) =>
  api.post('validation', { body: { packageJSON, isProduction } });

const getQualificationByScore = score => {
  if (score === null) return null;
  if (score >= 0.9) return 'green';
  else if (score < 0.9 && score > 0.5) return 'orange';
  else return 'red';
};

export const getResult = async cid => {
  if (!cid) return { completed: false };
  const result = await api.get('package', { query: { cid } });
  const data = result.item.validationData ? JSON.parse(result.item.validationData) : {};
  const score = data && data.stats && data.stats[result.item.packageName]
    ? data.stats[result.item.packageName].score.final
    : null;
  return {
    completed: result.item.validationState.state === 'Completed',
    name: result.item.packageName,
    version: result.item.packageVersion,
    data,
    qualification: getQualificationByScore(score)
  };
};

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getNpmSuggestions = (keyword, version) => {
  if (!keyword) return [];
  return fetch(
    `https://ofcncog2cu-dsn.algolia.net/1/indexes/*/queries?x-algolia-application-id=OFCNCOG2CU&x-algolia-api-key=f54e21fa3a2a0160595bb058179bfb1e`,
    {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            indexName: 'npm-search',
            params: prepareQuery({
              query: keyword,
              optionalFacetFilters: `concatenatedName:${keyword}`,
              hitsPerPage: '5',
              maxValuesPerFacet: '10',
              page: '0',
              attributesToRetrieve: '["name","description","versions"]',
              facets: '["keywords","keywords"]',
              tagFilters: ''
            })
          }
        ]
      })
    }
  )
    .then(res => res.json())
    .then(json => {
      const hits = json.results[0].hits;
      if (version === null) return hits.map(({ name, description }) => ({ title: name, description }));
      const exactHit = hits.find(({ name }) => name === keyword);
      if (!exactHit) return [];
      const pattern = new RegExp(`^${version.replace(/\./g, '\\.')}`);
      return [...Object.keys(exactHit.versions || {}), 'latest']
        .reverse()
        .filter(version => pattern.test(version))
        .slice(0, 10)
        .map(version => ({ title: `${keyword}@${version}` }));
    })
    .catch(error => []);
};

/* export const getNpmVersionSuggestions = (name, version) =>
  api.get('versions', { query: { name, version } }).then(versions => versions.map(title => ({ title })).slice(0, 10)); */
