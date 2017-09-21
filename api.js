import 'isomorphic-fetch';
import { stringify } from 'querystring';

const dummyPackagePattern = /^(@?[^@]*)(@(.*))?$/;
const fullPackagePattern = /^((@([^@]+)\/)?([^@]+))(@(.*))?$/;

const getEnv = () => (global.window ? window.env : process.env);
const isDev = () => getEnv().NODE_ENV === 'development';
const getEndpoint = () =>
  (isDev() ? 'http://localhost:3001' : 'https://nriy2mztj9.execute-api.eu-central-1.amazonaws.com/dev');

const resolvePackage = pkg => {
  if (!fullPackagePattern.test(pkg)) return {};
  const [, fullName, rawScope, scope, name, rawVersion, version] = fullPackagePattern.exec(pkg);
  return { name: fullName, version: version === 'latest' ? undefined : version };
};

export const splitNameAndVersion = pkg => {
  if (!dummyPackagePattern.test(pkg)) return { name: '' };
  const [, name, , version] = dummyPackagePattern.exec(pkg);
  return { name, version };
};

const prepareQuery = query => stringify(JSON.parse(JSON.stringify(query)));

const invoke = method => async (path, { query = {}, body }) => {
  const response = await fetch(`${getEndpoint()}/${path}?${prepareQuery(query)}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json.message);
  return json;
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
    completed: ['SUCCEEDED', 'FAILED'].includes(result.item.validationState.state),
    state: result.item.validationState.state,
    name: result.item.packageName,
    version: result.item.packageVersion,
    data,
    qualification: getQualificationByScore(score)
  };
};

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getNpmSuggestions = (name, version) => {
  if (!name) return [];
  return api.get('suggestions', { query: { name, version } });
};
