import 'isomorphic-fetch';
import { stringify } from 'querystring';

const fullPackage = /^(@[a-zA-Z0-9-]+\/)?([a-zA-Z0-9-]+)(@(\d.\d.\d))?$/;
const endpoint = 'http://localhost:3001';

const resolvePackage = pkg => {
  if (!fullPackage.test(pkg)) throw new Error('Invalid package name');
  const [, scope = '', name, , version] = fullPackage.exec(pkg);
  return { name: scope + name, version };
};

const prepareQuery = query => stringify(JSON.parse(JSON.stringify(query)));

export const getNpmSuggestions = keyword => {
  if (!keyword) return [];
  const q = encodeURIComponent(keyword.replace(/\//g, ' '));
  return fetch(
    `https://ac.cnstrc.com/autocomplete/${q}?autocomplete_key=CD06z4gVeqSXRiDL2ZNK&i=be28c228-0e87-471b-b0ba-6490ee3a4500&s=218&query=${q}`
  )
    .then(res => res.json())
    .then(json => [
      ...json.sections.packages.map(pkg => ({ title: pkg.value, description: pkg.data.description })),
      ...json.sections.standard.map(standard => ({ title: standard.value }))
    ])
    .catch(error => []);
};

const invoke = method => async (path, { query = {}, body }) => {
  const response = await fetch(
    `${endpoint}/${path}?${prepareQuery(query)}`,
    body ? { method, body: JSON.stringify(body) } : { method }
  );
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
