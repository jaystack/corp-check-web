import React from 'react';
import { Popup, Label, Icon } from 'semantic-ui-react';
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
  state = {
    isOpen: (this.props.depth || 0) < 1
  };

  handleOpenClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderNode() {
    const { isOpen } = this.state;
    const { node: { nodeName, nodeVersion, nodeScore, dependencies } } = this.props;
    return (
      <div className="node" style={{ backgroundColor: getColorByScore(nodeScore) }}>
        <span className="name">
          {nodeName}@{nodeVersion}
        </span>
        <span className="score">{getPercentage(nodeScore)}%</span>
        <span className="icon">
          {dependencies.length > 0 && (
            <Icon
              name={isOpen ? 'chevron circle right' : 'chevron circle left'}
              size="large"
              onClick={this.handleOpenClick}
            />
          )}
        </span>
      </div>
    );
  }

  render() {
    const { depth = 0, node: { dependencies, evaluations } } = this.props;
    const { isOpen } = this.state;
    const popupContent = getPopupContent(evaluations);
    return (
      <div className="tree">
        {popupContent.length > 0 ? <Popup trigger={this.renderNode()}>{popupContent}</Popup> : this.renderNode()}
        {isOpen && (
          <div className="dependencies">
            {dependencies.map(dependency => <Tree key={dependency.nodeName} node={dependency} depth={depth + 1} />)}
          </div>
        )}
      </div>
    );
  }
}
