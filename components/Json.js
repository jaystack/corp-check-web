import React from 'react';
import { Input } from 'semantic-ui-react';
import Upload from './Upload';

export default class extends React.PureComponent {
  render() {
    return <Upload onChange={content => console.log(content)} />;
  }
}
