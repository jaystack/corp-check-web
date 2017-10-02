import React from 'react';
import { Popup, Label } from 'semantic-ui-react';
import getColorByScore from '../utils/getColorByScore';

const flatArray = array => array.reduce((prev, next) => [...prev, ...next], []);

const getPopupContent = evaluations =>
  flatArray(
    evaluations.map(({ name, logs }, i) =>
      logs.map(({ message, type }, j) => (
        <Label basic key={`${i}-${j}`} color={type === 'ERROR' ? 'red' : ''} className="evaluation-log">
          {name.toUpperCase()} {type} <Label.Detail>{message}</Label.Detail>
        </Label>
      ))
    )
  );

export default class Tree extends React.PureComponent {
  renderNode() {
    const { nodeName, nodeVersion, nodeScore } = this.props.node;
    return (
      <div className="node" style={{ backgroundColor: getColorByScore(nodeScore) }}>
        <span className="name">{nodeName}@{nodeVersion}</span>
        <span className="score">{nodeScore * 100}%</span>
      </div>
    );
  }

  render() {
    const { dependencies, evaluations } = this.props.node;
    const popupContent = getPopupContent(evaluations);
    return (
      <div className="tree">
        {popupContent.length > 0
          ? <Popup trigger={this.renderNode()}>
              {popupContent}
            </Popup>
          : this.renderNode()}
        <div className="dependencies">
          {dependencies.map(dependency => <Tree key={dependency.nodeName} node={dependency} />)}
        </div>
      </div>
    );
  }
}
