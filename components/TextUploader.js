import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import Upload from './Upload';

export default class extends React.PureComponent {
  static propTypes = {
    filePlaceholder: PropTypes.string,
    textPlaceholder: PropTypes.string
  };

  render() {
    const { filePlaceholder, textPlaceholder } = this.props;
    return <Upload onChange={content => console.log(content)} placeholder={filePlaceholder} />;
  }
}
