const reduce = (reducer, accState, tree, path) => {
  const dependencies = tree.dependencies || [];
  return dependencies.reduce(
    (acc, node) => reduce(reducer, acc, node, [...path, node.nodeName]),
    reducer(accState, tree, path)
  );
};

const reduceTree = (tree, reducer, initialState) => {
  return reduce(reducer, initialState, tree, [tree.nodeName]);
};

const getId = (path, next) => (next ? [...path, next] : path).join('::');

const reducer = (acc, { nodeName, nodeScore, dependencies, evaluations }, path) => {
  const id = getId(path);
  const node = {
    data: {
      id,
      nodeScore,
      nodeName,
      evaluations
    }
  };
  const edges = dependencies.map(dependency => ({
    data: {
      source: id,
      target: getId(path, dependency.nodeName)
    }
  }));
  return {
    nodes: [...acc.nodes, node],
    edges: [...acc.edges, ...edges]
  };
};

export default rootEvaulation => {
  return reduceTree(rootEvaulation, reducer, { nodes: [], edges: [] });
};
