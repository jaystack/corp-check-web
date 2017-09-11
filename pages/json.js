import React from 'react';
import Router from 'next/router';
import Head from '../components/Head';
import Tab from '../components/Tab';
import { Form, TextArea, Button, Checkbox, Message } from 'semantic-ui-react';
import { validateByJson } from '../api';

export default class extends React.PureComponent {
  state = { value: '', isProduction: false, error: null, isFetchingValidation: false, validationError: null };

  handleSubmit = async () => {
    const { value, isProduction } = this.state;
    this.setState({ isFetchingValidation: true });
    try {
      const { cid } = await validateByJson(JSON.parse(value), isProduction);
      this.setState({ validationError: null });
      if (cid) Router.push({ pathname: '/result', query: { cid } });
    } catch (error) {
      this.setState({ validationError: error.message });
    } finally {
      this.setState({ isFetchingValidation: false });
    }
  };

  handleChange = evt => {
    try {
      if (evt.target.value) JSON.parse(evt.target.value);
      this.setState({ error: null });
    } catch (error) {
      this.setState({ error: 'Invalid JSON' });
    } finally {
      this.setState({ value: evt.target.value });
    }
  };

  handleSwitchProduction = (_, { checked }) => {
    this.setState({ isProduction: checked });
  };

  render() {
    const { url } = this.props;
    const { value, error, isFetchingValidation, validationError } = this.state;
    console.log(error);
    return (
      <div>
        <Head />
        <Tab pathname={url.pathname} inProgress={isFetchingValidation}>
          <Form error={!!error}>
            {validationError &&
              <Message negative>
                <p>{validationError}</p>
              </Message>}
            <Form.Field error={!!error}>
              <TextArea
                value={value}
                onChange={this.handleChange}
                autoHeight
                placeholder="Insert your package.json"
                style={{ minHeight: '300px', width: '100%', fontFamily: 'Courier New' }}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox label="Production only" onChange={this.handleSwitchProduction} />
            </Form.Field>
            <Form.Field>
              <Button color="teal" size="big" onClick={this.handleSubmit} disabled={!value || !!error}>Check</Button>
            </Form.Field>
          </Form>
        </Tab>
      </div>
    );
  }
}
