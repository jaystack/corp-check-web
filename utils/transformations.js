import reduceTree from './reduceTree';

export const composeLeft = (...funcs) => {
  if (funcs.length === 0) return _ => _;

  if (funcs.length === 1) return funcs[0];

  return funcs.reduce((acc, f) => (...args) => f(acc(...args)));
};

export const map = mapper => items => items.map(mapper);

export const filter = predicate => items => items.filter(predicate);

export const processGroupItems = (...processors) =>
  map(({ name, items }) => ({ name, items: composeLeft(...processors)(items) }));

export const flatTree = tree =>
  reduceTree(
    tree,
    (items, { evaluations }, path) =>
      evaluations.reduce(
        (items, { name, logs }) =>
          logs.reduce((items, { type, message }) => [...items, { evaluation: name, type, message, path }], items),
        items
      ),
    []
  );

export const sortBy = sorter => items => items.sort(sorter);

export const sortByPathLength = sortBy((a, b) => a.path.length - b.path.length);

export const sortByNames = prop => names =>
  sortBy((a, b) => {
    const aIndex = names.indexOf(a[prop]) || Infinity;
    const bIndex = names.indexOf(b[prop]) || Infinity;
    return bIndex - aIndex;
  });

export const sortGroupBy = sortByNames('name');

export const sortGroupByType = sortGroupBy(['ERROR', 'WARNING']);

export const sortGroupByEvaluation = sortGroupBy(['license', 'version']);

export const groupBy = (predicate, getGroupName) => items =>
  items.reduce((groups, item) => {
    const name = getGroupName(item);
    const groupIndex = groups.findIndex(group => predicate(group, name));
    return groupIndex > -1
      ? groups.map((group, i) => (i === groupIndex ? { name: group.name, items: [...group.items, item] } : group))
      : [...groups, { name, items: [item] }];
  }, []);

export const groupByValue = prop => groupBy((group, groupName) => group.name === groupName, item => item[prop]);

export const groupByType = groupByValue('type');

export const groupByEvaluation = groupByValue('evaluation');

export const getCountBy = name => items => {
  return items.filter(({ type }) => type === name).length;
};

export const flatGroups = array => array.reduce((prev, { items }) => [...prev, ...items], []);
