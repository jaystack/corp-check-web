import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, Button } from 'semantic-ui-react';
import FileSelect from './FileSelect';
import isValidJson from '../utils/isValidJson';

export default class extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string,
    textPlaceholder: PropTypes.string,
    onChange: PropTypes.func
  };

  state = {
    value: '',
    error: null
  };

  handleTextChange = evt => {
    try {
      if (evt.target.value) JSON.parse(evt.target.value);
      this.setState({ error: null });
    } catch (error) {
      this.setState({ error: 'Invalid JSON' });
    } finally {
      this.setState({ value: evt.target.value });
      this.props.onChange(evt.target.value);
    }
  };

  handleFileChange = value => {
    this.handleTextChange({ target: { value } });
  };

  handleBeautifyJSON = () => {
    this.setState({ value: JSON.stringify(JSON.parse(this.state.value), null, 2) });
  };

  isBeautifyJsonButtonDisabled() {
    return !this.state.value || !isValidJson(this.state.value);
  }

  render() {
    const { label, placeholder } = this.props;
    const { value, error } = this.state;
    return (
      <div className={classnames('text-uploader', error && 'error')}>
        <div className="button-container">
          <FileSelect onChange={this.handleFileChange} />
          <Button
            content="Beautify JSON"
            icon="align left"
            size="mini"
            disabled={this.isBeautifyJsonButtonDisabled()}
            onClick={this.handleBeautifyJSON}
          />
        </div>
        <Form.TextArea
          value={value}
          onChange={this.handleTextChange}
          placeholder={placeholder || 'Insert your content'}
          style={{
            minHeight: '300px',
            width: '100%',
            fontFamily: 'Courier New',
            border: '0',
            padding: '0px',
            marginTop: '10px',
            backgroundColor: 'transparent'
          }}
        />
      </div>
    );
  }
}
