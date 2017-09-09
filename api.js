import 'isomorphic-fetch';
import { stringify } from 'querystring';

const fullPackage = /^(@[a-zA-Z0-9-]+\/)?([a-zA-Z0-9-]+)(@(\d.\d.\d))?$/;
const endpoint = 'http://localhost:3001';

export const resultStatus = {
  NONE: Symbol('NONE'),
  PENDING: Symbol('PENDING'),
  COMPLETED: Symbol('COMPLETED')
};

const resolvePackage = pkg => {
  const [, scope = '', name, , version] = fullPackage.exec(pkg);
  return { name: scope + name, version };
};

const prepareQuery = query => stringify(JSON.parse(JSON.stringify(query)));

const invoke = method => (path, { query = {}, body = {} }) =>
  fetch(`${endpoint}/${path}?${prepareQuery(query)}`, { method, body }).then(res => res.json());

const api = {
  get: invoke('GET'),
  post: invoke('POST'),
  put: invoke('PUT'),
  delete: invoke('DELETE')
};

export const validateByName = name => api.get('validation', { query: resolvePackage(name) });

export const getResult = async cid => {
  if (!cid) return { status: resultStatus.NONE };
  const result = await api.get('package', { query: { cid } });
  return result.item.validationState.state === 'Completed' ? { status: resultStatus.COMPLETED } : { status: resultStatus.PENDING };
};
