import 'isomorphic-fetch';
import { stringify } from 'querystring';

const fullPackage = /^(@[a-zA-Z0-9-]+\/)?([a-zA-Z0-9-]+)(@(\d.\d.\d))?$/;
const endpoint = 'http://localhost:3001';

const resolvePackage = pkg => {
  const [, scope = '', name, , version] = fullPackage.exec(pkg);
  return { name: scope + name, version };
};

const prepareQuery = query => stringify(JSON.parse(JSON.stringify(query)));

const invoke = method => (path, { query = {}, body }) =>
  fetch(
    `${endpoint}/${path}?${prepareQuery(query)}`,
    body ? { method, body: JSON.stringify(body) } : { method }
  ).then(res => res.json());

const api = {
  get: invoke('GET'),
  post: invoke('POST'),
  put: invoke('PUT'),
  delete: invoke('DELETE')
};

export const validateByName = name => api.get('validation', { query: resolvePackage(name) });

export const validateByJson = (packageJSON, isProduction = false) =>
  api.post('validation', { body: { packageJSON, isProduction } });

export const getResult = async cid => {
  if (!cid) return { completed: false };
  const result = await api.get('package', { query: { cid } });
  console.log(result);
  return {
    completed: result.item.validationState.state === 'Completed',
    name: result.item.packageName,
    version: result.item.packageVersion
  };
};
