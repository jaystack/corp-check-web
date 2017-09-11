import 'isomorphic-fetch';
import { stringify } from 'querystring';

const fullPackage = /^(@[a-zA-Z0-9-]+\/)?([a-zA-Z0-9-]+)(@(\d.\d.\d))?$/;
//const endpoint = 'http://localhost:3001';
const endpoint = 'https://nriy2mztj9.execute-api.eu-central-1.amazonaws.com/dev';

const resolvePackage = pkg => {
  if (!fullPackage.test(pkg)) throw new Error('Invalid package name');
  const [, scope = '', name, , version] = fullPackage.exec(pkg);
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
  console.log(result);
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

export const getNpmSuggestions = keyword => {
  if (!keyword) return [];
  const q = encodeURIComponent(keyword.replace(/\//g, ' '));
  return fetch(`https://api.npms.io/v2/search/suggestions?${prepareQuery({ q, size: 5 })}`)
    .then(res => res.json())
    .then(json => json.map(({ package: { name, version, description } }) => ({ title: name, version, description })))
    .catch(error => []);
};
