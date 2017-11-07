import 'isomorphic-fetch';
import { stringify } from 'querystring';
import { resolveNpmPackageName } from 'corp-check-core';

const getEnvVars = () => (global.window ? window.env : process.env);

const getEndpoint = () => getEnvVars().API_URL || 'http://localhost:3001';

export const splitNameAndVersion = pkg => {
  const signature = resolveNpmPackageName(pkg);
  return signature ? { name: signature.fullName, version: signature.version } : { name: '' };
};

const getProgress = message => {
  if (!message) return null;
  const parts = message.split(' - ');
  if (parts.length < 2) return null;
  const [ value, total ] = parts[0].split('/');
  return { value, total, message: parts[1] };
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

export const getResult = async ({ cid, name, version: rawVersion, scope: rawScope }) => {
  if (cid) return getResultByCid(cid);
  if (!name) return getResultByCid(undefined);
  const scope = rawScope ? '@' + rawScope + '/' : '';
  const version = rawVersion ? '@' + rawVersion : '';
  const fullPackageName = `${scope}${name}${version}`;
  return getResultByCid((await validateByName(fullPackageName)).cid);
};

const getResultByCid = async cid => {
  if (!cid) return { completed: false };
  const result = await api.get('package', { query: { cid } });
  return {
    completed: [ 'SUCCEEDED', 'FAILED' ].includes(result.state.type),
    state: result.state.type,
    progress: getProgress(result.state.message),
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

export const getReadme = url => async () => {
  const response = await fetch(url);
  return await response.text();
};

export const getRulesReadme = getReadme(
  'https://raw.githubusercontent.com/jaystack/corp-check-rest/master/rules-README.md'
);

export const getCliReadme = getReadme('https://raw.githubusercontent.com/jaystack/corp-check-cli/master/README.md');

export const getBadgesReadme = getReadme('https://raw.githubusercontent.com/jaystack/corp-check-rest/master/badge-README.md');
