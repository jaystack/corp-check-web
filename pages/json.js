import React from 'react';
import Router from 'next/router';
import Tab from '../components/Tab';
import RuleSet from '../components/RuleSet';
import TextUploader from '../components/TextUploader';
import { Form, TextArea, Button, Checkbox, Message } from 'semantic-ui-react';
import isValidJson from '../utils/isValidJson';
import { validateByJson } from '../api';

export default class extends React.PureComponent {
  state = {
    value: '',
    isProduction: false,
    isFetchingValidation: false,
    validationError: null,
    ruleSet: ''
  };

  handleSubmit = async () => {
    const { value, isProduction, ruleSet } = this.state;
    this.setState({ isFetchingValidation: true });
    try {
      const { cid } = await validateByJson(value, isProduction, ruleSet && isValidJson(ruleSet) ? ruleSet : null);
      this.setState({ validationError: null });
      if (cid) Router.push({ pathname: '/result', query: { cid } });
    } catch (error) {
      this.setState({ validationError: error.message });
    } finally {
      this.setState({ isFetchingValidation: false });
    }
  };

  handlePackageJsonChange = value => {
    this.setState({ value });
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
          <TextUploader
            label="package.json"
            placeholder="Insert your package.json"
            onChange={this.handlePackageJsonChange}
          />
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
