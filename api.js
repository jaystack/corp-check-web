import 'isomorphic-fetch';
import { stringify } from 'querystring';

const dummyPackagePattern = /^(@?[^@]*)(@(.*))?$/;
const fullPackagePattern = /^((@([^@]+)\/)?([^@]+))(@(.*))?$/;

const getEnvVars = () => (global.window ? window.env : process.env);
const isDev = () => getEnvVars().NODE_ENV === 'development';
const getEnvironment = () => getEnvVars().ENV;
const getEndpoint = () => {
  switch (getEnvironment()) {
    case 'dev':
      return 'https://nriy2mztj9.execute-api.eu-central-1.amazonaws.com/dev';
    case 'stage':
      return '';
    case 'prod':
      return '';
    default:
      return 'http://localhost:3001';
  }
};

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

export const validateByName = packageName => api.post('validation', { body: { packageName } });

export const validateByJson = (packageJSON, isProduction = false) =>
  api.post('validation', { body: { packageJSON, isProduction } });

export const getResult = async cid => {
  if (!cid) return { completed: false };
  const result = await api.get('package', { query: { cid } });
  return {
    completed: ['SUCCEEDED', 'FAILED'].includes(result.state.type),
    state: result.state.type,
    name: result.name,
    ...result.result
  };
};

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getNpmSuggestions = (name, version) => {
  if (!name) return [];
  return api.get('suggestions', { query: { name, version } });
};
