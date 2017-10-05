import React from 'react';
import Router from 'next/router';
import Tab from '../components/Tab';
import TextUploader from '../components/TextUploader';
import CollapsableTextUploader from '../components/CollapsableTextUploader';
import { Form, TextArea, Button, Message } from 'semantic-ui-react';
import isValidJson from '../utils/isValidJson';
import { validateByJson } from '../api';

export default class extends React.PureComponent {
  state = {
    packageJson: '',
    isProduction: false,
    isFetchingValidation: false,
    validationError: null,
    ruleSet: ''
  };

  handleSubmit = async () => {
    const { packageJson, isProduction, ruleSet } = this.state;
    this.setState({ isFetchingValidation: true });
    try {
      const { cid } = await validateByJson(packageJson, isProduction, ruleSet && isValidJson(ruleSet) ? ruleSet : null);
      this.setState({ validationError: null });
      if (cid) Router.push({ pathname: '/result', query: { cid } });
    } catch (error) {
      this.setState({ validationError: error.message });
    } finally {
      this.setState({ isFetchingValidation: false });
    }
  };

  handlePackageJsonChange = packageJson => {
    this.setState({ packageJson });
  };

  handleSwitchProduction = (_, { checked }) => {
    this.setState({ isProduction: checked });
  };

  handleRuleSetChange = ruleSet => {
    this.setState({ ruleSet });
  };

  render() {
    const { url } = this.props;
    const { packageJson, isFetchingValidation, validationError, ruleSet } = this.state;
    return (
      <Tab pathname={url.pathname} inProgress={isFetchingValidation}>
        <Form>
          {validationError && (
            <Message negative>
              <p>{validationError}</p>
            </Message>
          )}
          <Form.Field>
            <TextUploader
              label="package.json"
              placeholder="Insert your package.json"
              onChange={this.handlePackageJsonChange}
            />
          </Form.Field>
          <Form.Field>
            <CollapsableTextUploader
              title="Rules"
              placeholder="Describe your rules"
              onChange={this.handleRuleSetChange}
            />
          </Form.Field>
          <Form.Field className="production-only">
            <Form.Checkbox label="Production only" onChange={this.handleSwitchProduction} />
          </Form.Field>
          <Form.Field>
            <Form.Button
              color="teal"
              size="big"
              content="Check"
              onClick={this.handleSubmit}
              disabled={!packageJson || !isValidJson(packageJson) || !isValidJson(ruleSet)}
            />
          </Form.Field>
        </Form>
      </Tab>
    );
  }
}
