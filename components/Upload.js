import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Input } from 'semantic-ui-react';

export default class extends React.PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  };

  state = {
    name: '',
    content: null
  };

  handleClick = evt => {
    findDOMNode(this.refs.file).click();
  };

  handleFileChange = evt => {
    const file = evt.target.files[0];
    const name = file.name;
    this.setState({ name });
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      this.props.onChange(content);
      this.setState({ content });
    };
    reader.readAsText(file);
  };

  render() {
    return (
      <div>
        <Input
          onClick={this.handleClick}
          action={{ icon: 'attach', onClick: this.handleClick }}
          placeholder={this.props.placeholder || 'Select file'}
          readOnly
          value={this.state.name}
        />
        <input type="file" style={{ display: 'none' }} onChange={this.handleFileChange} ref="file" />
      </div>
    );
  }
}
