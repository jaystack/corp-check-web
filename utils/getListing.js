import {
  composeLeft,
  flatTree,
  groupByValue,
  sortByNames,
  flatGroups,
  getCountBy,
  sortByPathLength,
  sortGroupByType,
  groupByType,
  sortGroupByEvaluation,
  groupByEvaluation,
  processGroupItems
} from './transformations';

export default rootEvaluation => {
  const items = composeLeft(
    flatTree,
    groupByType,
    processGroupItems(
      groupByEvaluation,
      processGroupItems(sortByPathLength),
      sortGroupByEvaluation,
      flatGroups
    ),
    sortGroupByType,
    flatGroups
  )(rootEvaluation);
  
  return {
    items: items,
    errorCount: getCountBy('ERROR')(items),
    warningCount: getCountBy('WARNING')(items)
  };
};
