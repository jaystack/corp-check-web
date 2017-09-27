import React from 'react';
import { Label } from 'semantic-ui-react';
import getTreeElements from '../utils/getTreeElements';

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
    //console.log(rootEvaluation);
    //const elements = getTreeElements(rootEvaluation);
    //console.log(elements);
    return (
      <div>
        {qualification &&
          <Label size="massive" as="a" color={getQualificationColor(qualification)} ribbon>
            {getQualificationLabel(qualification)}
          </Label>}
        <h1 style={{ display: 'inline' }}>{name}</h1>
        <br />
        <br />
      </div>
    );
  }
}
