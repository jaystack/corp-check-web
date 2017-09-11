import React from 'react';
import { Label } from 'semantic-ui-react';

const getQualificationLabelByColor = color => {
  switch (color) {
    case 'green':
      return 'Recommended';
    case 'orange':
      return 'Accepted';
    case 'red':
      return 'Rejected';
  }
};

export default class extends React.PureComponent {
  render() {
    const { result } = this.props;
    return (
      <div>
        {result.qualification &&
          <Label size="massive" as="a" color={result.qualification} ribbon>
            {getQualificationLabelByColor(result.qualification)}
          </Label>}
        <h1 style={{ display: 'inline' }}>{result.name}{result.version ? '@' + result.version : ''}</h1>
        <br />
        <br />
        <pre>{JSON.stringify(result.data, null, 2)}</pre>
      </div>
    );
  }
}
