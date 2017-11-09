import React from 'react';
import { Label, Header, Grid, Divider, Statistic, Icon, Button, Tab } from 'semantic-ui-react';
import Summary from './Summary';
import Listing from './Listing';
import Tree from './Tree';
import getPercentage from '../utils/getPercentage';
import { getQualificationColor, getQualificationLabel } from '../utils/qualification';

export default class extends React.PureComponent {
  expandAll = () => {
    this.refs.tree.toggle(true, true);
  };

  collapseAll = () => {
    this.refs.tree.toggle(false, true);
  };

  renderTree() {
    return (
      <div>
        <Button.Group basic className="expand-collapse-button-group" size="mini">
          <Button icon="expand" content="Expand all" onClick={this.expandAll} />
          <Button icon="compress" content="Collapse all" onClick={this.collapseAll} />
        </Button.Group>
        <div className="tree-container">
          <Tree node={this.props.result.rootEvaluation} ref="tree" />
        </div>
      </div>
    );
  }

  render() {
    const { result: { name, date, qualification, rootEvaluation } = {} } = this.props;
    return (
      <main>
        <Grid divided="vertically">
          <Grid.Row>
            <Grid.Column width={10}>
              {qualification && (
                <Label
                  size="massive"
                  as="a"
                  color={getQualificationColor(qualification)}
                  ribbon
                  style={{ cursor: 'default' }}
                >
                  {getQualificationLabel(qualification)}
                </Label>
              )}
              <Header
                size="huge"
                style={{ display: 'inline' }}
                as="a"
                href={`https://www.npmjs.com/package/${rootEvaluation.nodeName}`}
                target="_blank"
              >
                {name}
              </Header>
            </Grid.Column>
            <Grid.Column width={6} textAlign="right">
              <Statistic>
                <Statistic.Value>{getPercentage(rootEvaluation.nodeScore)}%</Statistic.Value>
                <Statistic.Label>SCORE</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="date-container">
          <Label size="big">
            <Icon name="calendar" />Corp-Checked at<Label.Detail>{new Date(date).toLocaleString()}</Label.Detail>
          </Label>
        </div>
        <Tab
          renderActiveOnly={false}
          panes={[
            {
              menuItem: 'Summary',
              pane: (
                <Tab.Pane key="summary">
                  <Summary rootEvaluation={rootEvaluation} />
                </Tab.Pane>
              )
            },
            {
              menuItem: 'Listing',
              pane: (
                <Tab.Pane key="listing">
                  <Listing rootEvaluation={rootEvaluation} />
                </Tab.Pane>
              )
            },
            {
              menuItem: 'Details',
              pane: <Tab.Pane key="details">{this.renderTree()}</Tab.Pane>
            }
          ]}
        />
      </main>
    );
  }
}
