import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Button } from 'semantic-ui-react';

export default class extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func
  };

  getFileInput() {
    return findDOMNode(this.refs.file);
  }

  handleClick = evt => {
    this.getFileInput().click();
  };

  handleFileChange = evt => {
    const file = evt.target.files[0];
    if (!file) return;
    const name = file.name;
    this.setState({ name });
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      this.props.onChange(content);
      this.getFileInput().value = '';
      this.setState({ content, name: '' });
    };
    reader.readAsText(file);
  };

  render() {
    return (
      <div className="file-select">
        <Button content="Select file" icon="file" onClick={this.handleClick} size="mini" />
        <input type="file" style={{ display: 'none' }} onChange={this.handleFileChange} ref="file" />
      </div>
    );
  }
}
