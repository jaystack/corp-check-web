import React from 'react';
import classnames from 'classnames';
import { Popup, Label, Icon } from 'semantic-ui-react';
import { LogType } from 'corp-check-core';
import getColorByScore from '../utils/getColorByScore';
import getPercentage from '../utils/getPercentage';

const flatArray = array => array.reduce((prev, next) => [...prev, ...next], []);

const getLogColor = type => {
  switch (type) {
    case LogType.ERROR:
      return 'red';
    case LogType.WARNING:
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
  static defaultProps = {
    depth: 0
  };

  state = {
    isOpen: this.props.depth < 1
  };

  dependencies = [];

  /**
   * ANTIPATTERN WARNING
   * 
   * This toggle method is even called by outside
   * of the component. This is antipattern in React.
   * But that is the simplest way to reach the
   * expected effect.
   * 
   * There are two other solutions:
   * 
   * 1) The component has an `isOpenAll` property.
   *    When it changes, the `isOpen` state follows
   *    its value. However `isOpenAll` could not be
   *    independent state of the application, because
   *    every single node component holds the state of
   *    the exposition. If any node's `isOpen` property
   *    changes, then the `isOpenAll` property is
   *    going to be invalid.
   * 
   * 2) The application has a global store, and that
   *    describes the whole exposition state.
   */

  toggle(isOpen = !this.state.isOpen, all = false) {
    if (all) this.dependencies.forEach(dependency => dependency.toggle(isOpen, all));
    if (isOpen === false && all === true && this.props.depth === 0) return;
    this.setState({ isOpen });
  }

  handleOpenClick = () => {
    this.toggle();
  };

  augmentDependecyRefs = dependency => {
    this.dependencies = [...this.dependencies, dependency];
  };

  renderNode() {
    const { isOpen } = this.state;
    const { depth, node: { nodeName, nodeVersion, nodeScore, dependencies } } = this.props;
    return (
      <div className="node" style={{ backgroundColor: getColorByScore(nodeScore) }}>
        <span className="name">
          {nodeName}@{nodeVersion}
        </span>
        <span className="score">{getPercentage(nodeScore)}%</span>
        <span className="icon">
          {dependencies.length > 0 &&
            <Icon
              name={isOpen ? 'chevron circle left' : 'chevron circle right'}
              size="large"
              onClick={this.handleOpenClick}
            />}
        </span>
      </div>
    );
  }

  renderDependencies() {
    const { depth, node: { dependencies } } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="dependencies" className={classnames(!isOpen && 'hidden')}>
        {dependencies.map(dependency => (
          <Tree key={dependency.nodeName} node={dependency} depth={depth + 1} ref={this.augmentDependecyRefs} />
        ))}
      </div>
    );
  }

  render() {
    const { node: { evaluations } } = this.props;
    const popupContent = getPopupContent(evaluations);
    return (
      <div className="tree">
        {popupContent.length > 0 ? <Popup trigger={this.renderNode()}>{popupContent}</Popup> : this.renderNode()}
        {this.renderDependencies()}
      </div>
    );
  }
}
