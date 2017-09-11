import React from 'react';
import { Label } from 'semantic-ui-react';

export default class extends React.PureComponent {
  render() {
    const { result } = this.props;
    return (
      <div>
        <Label size="massive" as="a" color="red" ribbon>Rejected</Label>
        <h1 style={{ display: 'inline' }}>{result.name}{result.version ? '@' + result.version : ''}</h1>
        <br />
        <br />
        <Label size="massive" as="a" color="orange" ribbon>Accepted</Label>
        <br />
        <br />
        <Label size="massive" as="a" color="green" ribbon>Recommended</Label>
        <br />
        <br />
      </div>
    );
  }
}
