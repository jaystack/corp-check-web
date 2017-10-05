import React from 'react';
import { Popup, Label } from 'semantic-ui-react';
import getColorByScore from '../utils/getColorByScore';
import getPercentage from '../utils/getPercentage';

const flatArray = array => array.reduce((prev, next) => [ ...prev, ...next ], []);

const getLogColor = type => {
  switch (type) {
    case 'ERROR':
      return 'red';
    case 'WARNING':
      return 'orange';
    default:
      return 'black';
  }
};

const getPopupContent = evaluations =>
  flatArray(
    evaluations.map(({ name, logs }, i) =>
      logs.map(({ message, type }, j) => (
        <Label basic key={`${i}-${j}`} color={getLogColor(type)} className="evaluation-log">
          {message}
        </Label>
      ))
    )
  );

export default class Tree extends React.PureComponent {
  renderNode() {
    const { nodeName, nodeVersion, nodeScore } = this.props.node;
    return (
      <div className="node" style={{ backgroundColor: getColorByScore(nodeScore) }}>
        <span className="name">
          {nodeName}@{nodeVersion}
        </span>
        <span className="score">{getPercentage(nodeScore)}%</span>
      </div>
    );
  }

  render() {
    const { dependencies, evaluations } = this.props.node;
    const popupContent = getPopupContent(evaluations);
    return (
      <div className="tree">
        {popupContent.length > 0 ? <Popup trigger={this.renderNode()}>{popupContent}</Popup> : this.renderNode()}
        <div className="dependencies">
          {dependencies.map(dependency => <Tree key={dependency.nodeName} node={dependency} />)}
        </div>
      </div>
    );
  }
}
