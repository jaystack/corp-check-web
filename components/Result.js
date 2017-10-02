import React from 'react';
import { Label, Header, Grid, Divider, Statistic, Icon } from 'semantic-ui-react';
import Tree from './Tree';

const getQualificationLabel = qualification => {
  switch (qualification) {
    case 'RECOMMENDED':
      return 'Recommended';
    case 'ACCPETED':
      return 'Accepted';
    case 'REJECTED':
      return 'Rejected';
  }
};

const getQualificationColor = qualification => {
  switch (qualification) {
    case 'RECOMMENDED':
      return 'green';
    case 'ACCPETED':
      return 'orange';
    case 'REJECTED':
      return 'red';
  }
};

export default class extends React.PureComponent {
  render() {
    const { result: { name, date, qualification, rootEvaluation } = {} } = this.props;
    console.log(rootEvaluation);
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row>
            <Grid.Column width={10}>
              {qualification &&
                <Label size="massive" as="a" color={getQualificationColor(qualification)} ribbon>
                  {getQualificationLabel(qualification)}
                </Label>}
              <Header size="huge" style={{ display: 'inline' }}>{name}</Header>
            </Grid.Column>
            <Grid.Column width={6} textAlign="right">
              <Statistic>
                <Statistic.Value>
                  {rootEvaluation.nodeScore * 100}%
                </Statistic.Value>
                <Statistic.Label>SCORE</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Label size="big"><Icon name="calendar" />Evaluated at {new Date(date).toLocaleString()}</Label>
        <Divider />
        <div className="tree-container">
          <Tree node={rootEvaluation} />
        </div>
      </div>
    );
  }
}
