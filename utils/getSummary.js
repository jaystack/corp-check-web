import {
  composeLeft,
  flatTree,
  groupByEvaluation,
  sortGroupByEvaluation,
  groupByType,
  sortGroupByType,
  sortByPathLength,
  processGroupItems
} from './transformations';

export default rootEvaluation => {
  return composeLeft(
    flatTree,
    groupByEvaluation,
    processGroupItems(
      groupByType,
      processGroupItems(sortByPathLength),
      sortGroupByType
    ),
    sortGroupByEvaluation
  )(rootEvaluation);
};
