import {
  composeLeft,
  flatTree,
  groupByEvaluation,
  sortGroupByEvaluation,
  groupByType,
  sortGroupByType,
  sortByPathLength,
  processGroupItems,
  map,
  extendErrorCount,
  extendHasWarning,
  ensureEvaluationGroups,
  ensureTypeGroups
} from './transformations';

export default rootEvaluation => {
  return composeLeft(
    flatTree,
    groupByEvaluation,
    ensureEvaluationGroups,
    sortGroupByEvaluation,
    processGroupItems(
      groupByType,
      ensureTypeGroups,
      sortGroupByType,
      processGroupItems(sortByPathLength
      )
    )
  )(rootEvaluation);
};
