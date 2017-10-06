const reduce = (reducer, accResult, node, path, depth) => {
  const rootValue = reducer(accResult, node, path);
  return path.length > depth + 1
    ? rootValue
    : (node.dependencies || [])
        .reduce((acc, dependency) => reduce(reducer, acc, dependency, [...path, dependency.nodeName], depth), rootValue);
};

export default (tree, reducer, initialResult, depth = Infinity) => {
  return reduce(reducer, initialResult, tree, [tree.nodeName], depth);
};
