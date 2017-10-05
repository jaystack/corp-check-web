import React from 'react';
import Router from 'next/router';
import Tab from '../components/Tab';
import RuleSet from '../components/RuleSet';
import Json from '../components/Json';
import { Form, TextArea, Button, Checkbox, Message } from 'semantic-ui-react';
import isValidJson from '../utils/isValidJson';
import { validateByJson } from '../api';

export default class extends React.PureComponent {
  state = {
    value: '',
    isProduction: false,
    error: null,
    isFetchingValidation: false,
    validationError: null,
    ruleSet: ''
  };

  handleSubmit = async () => {
    const { value, isProduction, ruleSet } = this.state;
    this.setState({ isFetchingValidation: true });
    try {
      const { cid } = await validateByJson(
        JSON.parse(value),
        isProduction,
        ruleSet && isValidJson(ruleSet) ? JSON.parse(ruleSet) : null
      );
      this.setState({ validationError: null });
      if (cid) Router.push({ pathname: '/result', query: { cid } });
    } catch (error) {
      this.setState({ validationError: error.message });
    } finally {
      this.setState({ isFetchingValidation: false });
    }
  };

  handleJsonChange = evt => {
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

  handleRuleSetChange = evt => {
    this.setState({ ruleSet: evt.target.value });
  };

  render() {
    const { url } = this.props;
    const { value, error, isFetchingValidation, validationError, ruleSet } = this.state;
    return (
      <Tab pathname={url.pathname} inProgress={isFetchingValidation}>
        <Form error={!!error}>
          {validationError && (
            <Message negative>
              <p>{validationError}</p>
            </Message>
          )}
          <Form.Field error={!!error}>
            <TextArea
              value={value}
              onChange={this.handleJsonChange}
              autoHeight
              placeholder="Insert your package.json"
              style={{ minHeight: '300px', width: '100%', fontFamily: 'Courier New' }}
            />
          </Form.Field>
          <RuleSet value={ruleSet} onChange={this.handleRuleSetChange} inForm />
          <Form.Field className="production-only">
            <Checkbox label="Production only" onChange={this.handleSwitchProduction} />
          </Form.Field>
          <Form.Field>
            <Button
              color="teal"
              size="big"
              onClick={this.handleSubmit}
              disabled={!value || !!error || !isValidJson(ruleSet)}
            >
              Check
            </Button>
          </Form.Field>
        </Form>
      </Tab>
    );
  }
}
