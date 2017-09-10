import React from 'react';
import Router from 'next/router';
import Head from '../components/Head';
import Tab from '../components/Tab';
import { Form, TextArea, Button, Checkbox, Message } from 'semantic-ui-react';
import { validateByJson } from '../api';

export default class extends React.PureComponent {
  state = { value: '', isProduction: false, error: null };

  handleSubmit = async () => {
    const { value, isProduction } = this.state;
    const { cid } = await validateByJson(JSON.parse(value), isProduction);
    if (cid) Router.push({ pathname: '/result', query: { cid } });
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
    const { value, error } = this.state;
    console.log(error);
    return (
      <div>
        <Head />
        <Tab pathname={url.pathname}>
          <Form error={!!error}>
            <Form.Field error={!!error}>
              <TextArea
                value={value}
                onChange={this.handleChange}
                autoHeight
                placeholder="Insert your package.json"
                style={{ minHeight: '300px', width: '100%', fontFamily: 'Courier New' }}
              />
            </Form.Field>
            {/* {error ? <Message error header="Error" content={error} /> : null} */}
            <Form.Field>
              <Checkbox label="Production only" onChange={this.handleSwitchProduction} />
            </Form.Field>
            <Form.Field>
              <Button color="teal" size="big" onClick={this.handleSubmit} disabled={!value || !!error}>Go</Button>
            </Form.Field>
          </Form>
        </Tab>
      </div>
    );
  }
}
