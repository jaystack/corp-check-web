import React from 'react';
import { Label, Divider, Statistic } from 'semantic-ui-react';
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
    const { result: { name, qualification, rootEvaluation } = {} } = this.props;
    console.log(rootEvaluation);
    return (
      <div>
        {qualification &&
          <Label size="massive" as="a" color={getQualificationColor(qualification)} ribbon>
            {getQualificationLabel(qualification)}
          </Label>}
        <h1 style={{ display: 'inline' }}>{name}</h1>
        <Divider />
        <Statistic size="huge" label="Score" value={rootEvaluation.nodeScore} />
        <Divider />
        <div className="tree-container">
          <Tree node={rootEvaluation} />
        </div>
      </div>
    );
  }
}
