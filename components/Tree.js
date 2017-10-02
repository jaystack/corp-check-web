import React from 'react';
import * as d3 from 'd3-scale';

const getNodeColor = d3
  .scaleLinear()
  .domain([0, 0.5, 1])
  .range(['rgb(219, 40, 40)', 'rgb(242, 113, 28)', 'rgb(33, 186, 69)']);

export default class Tree extends React.PureComponent {
  render() {
    const { nodeName, nodeScore, dependencies } = this.props.node;
    return (
      <div className="tree">
        <div className="node" style={{ backgroundColor: getNodeColor(nodeScore) }}>
          <span className="name">{nodeName}</span>
          <span className="score">{nodeScore * 100}%</span>
        </div>
        <div className="dependencies">
          {dependencies.map(dependency => <Tree key={dependency.nodeName} node={dependency} />)}
        </div>
      </div>
    );
  }
}
