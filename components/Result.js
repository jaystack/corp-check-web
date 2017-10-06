import React from 'react';
import { Label, Header, Grid, Divider, Statistic, Icon, Button, Tab } from 'semantic-ui-react';
import Tree from './Tree';
import getPercentage from '../utils/getPercentage';

const getQualificationLabel = qualification => {
  switch (qualification) {
    case 'RECOMMENDED':
      return 'Recommended';
    case 'ACCEPTED':
      return 'Accepted';
    case 'REJECTED':
      return 'Rejected';
  }
};

const getQualificationColor = qualification => {
  switch (qualification) {
    case 'RECOMMENDED':
      return 'green';
    case 'ACCEPTED':
      return 'orange';
    case 'REJECTED':
      return 'red';
  }
};

export default class extends React.PureComponent {
  expandAll = () => {
    this.refs.tree.toggle(true, true);
  };

  collapseAll = () => {
    this.refs.tree.toggle(false, true);
  };

  renderTree() {
    return (
      <div className="tree-container">
        <Button.Group basic className="expand-collapse-button-group" size="mini">
          <Button icon="expand" content="Expand all" onClick={this.expandAll} />
          <Button icon="compress" content="Collapse all" onClick={this.collapseAll} />
        </Button.Group>
        <Tree node={this.props.result.rootEvaluation} ref="tree" />
      </div>
    );
  }

  render() {
    const { result: { name, date, qualification, rootEvaluation } = {} } = this.props;
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row>
            <Grid.Column width={10}>
              {qualification && (
                <Label size="massive" as="a" color={getQualificationColor(qualification)} ribbon>
                  {getQualificationLabel(qualification)}
                </Label>
              )}
              <Header size="huge" style={{ display: 'inline' }}>
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
            <Icon name="calendar" />Evaluated at<Label.Detail>{new Date(date).toLocaleString()}</Label.Detail>
          </Label>
        </div>
        <Tab
          renderActiveOnly={false}
          panes={[
            { menuItem: 'Summary', pane: <Tab.Pane key="summary">Tab 1 Content</Tab.Pane> },
            { menuItem: 'Exposition', pane: <Tab.Pane key="exposition">{this.renderTree()}</Tab.Pane> }
          ]}
        />
      </div>
    );
  }
}
