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
      return 'https://api.corp-check.dev.jaystack.com';
    case 'stage':
      return 'https://api.corp-check.stage.jaystack.com';
    case 'prod':
      return 'https://api.corp-check.jaystack.com';
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

const invoke = method => async (path, { query = {}, body } = {}) => {
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

export const validateByName = (packageName, ruleSet) => api.post('validation', { body: { packageName, ruleSet } });

export const validateByJson = (packageJSON, packageLock, ruleSet, isProduction) =>
  api.post('validation', { body: { packageJSON, packageLock, ruleSet, isProduction } });

export const getResult = async cid => {
  if (!cid) return { completed: false };
  const result = await api.get('package', { query: { cid } });
  return {
    completed: ['SUCCEEDED', 'FAILED'].includes(result.state.type),
    state: result.state.type,
    date: result.state.date,
    name: result.name,
    ...result.result
  };
};

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getNpmSuggestions = (name, version) => {
  if (!name) return [];
  return api.get('suggestions', { query: { name, version } });
};

export const getPopularPackages = () => api.get('popular-packages');

export const getReadme = async () => {
  const response = await fetch('https://raw.githubusercontent.com/jaystack/corp-check-web/master/static/rules.md');
  return await response.text();
};
