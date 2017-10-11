import reduceTree from './reduceTree';

export const flatTree = tree =>
  reduceTree(
    tree,
    (items, { evaluations }, path) =>
      evaluations.reduce(
        (items, { name, logs }) =>
          logs
            .filter(({ type }) => type !== 'INFO')
            .reduce((items, { type, message }) => [...items, { evaluation: name, type, message, path }], items),
        items
      ),
    []
  );

export const sortByPathLength = items => items.sort((a, b) => a.path.length - b.path.length);

export const sortBy = prop => names => items =>
  items.sort((a, b) => {
    const aIndex = names.indexOf(a[prop]) || Infinity;
    const bIndex = names.indexOf(b[prop]) || Infinity;
    return bIndex - aIndex;
  });

export const groupBy = prop => items =>
  items.reduce((groups, item) => {
    const name = item[prop];
    const groupIndex = groups.findIndex(group => group.name === name);
    return groupIndex > -1
      ? groups.map((group, i) => (i === groupIndex ? { name: group.name, items: [...group.items, item] } : group))
      : [...groups, { name, items: [item] }];
  }, []);

export const getCountBy = name => items => {
  return items.filter(({ type }) => type === name).length;
};

export const flatGroups = array => array.reduce((prev, { items }) => [...prev, ...items], []);
