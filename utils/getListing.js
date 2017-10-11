import { flatTree, groupBy, sortBy, flatGroups, getCountBy } from './transformations';

const groupByType = groupBy('type');
const groupByEvaluation = groupBy('evaluation');
const sortGroupBy = sortBy('name');
const sortGroupByType = sortGroupBy(['ERROR', 'WARNING']);
const sortGroupByEvaluation = sortGroupBy(['license', 'version']);

export default rootEvaluation => {
  const flattedItems = flatTree(rootEvaluation);
  const sortedItems = flatGroups(
    sortGroupByType(
      groupByType(flattedItems).map(({ name, items }) => ({
        name,
        items: flatGroups(
          sortGroupByEvaluation(groupByEvaluation(items)).map(({ name, items }) => ({
            name,
            items: sortByPathLength(items)
          }))
        )
      }))
    )
  );
  return {
    items: sortedItems,
    errorCount: getCountBy('ERROR')(sortedItems),
    warningCount: getCountBy('WARNING')(sortedItems)
  };
};
