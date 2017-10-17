import React from 'react';
import Router from 'next/router';
import Page from '../components/Page';
import Tab from '../components/Tab';
import TextUploader from '../components/TextUploader';
import CollapsableTextUploader from '../components/CollapsableTextUploader';
import { Form, TextArea, Button, Message } from 'semantic-ui-react';
import { isValidJson } from 'corp-check-core';
import { validateByJson, getPopularPackages, getReadme } from '../api';

export default class extends React.PureComponent {
  static async getInitialProps() {
    const popularPackages = await getPopularPackages();
    const mdRules = await getReadme();
    return { popularPackages, mdRules };
  }

  state = {
    packageJson: '',
    packageLock: '',
    ruleSet: '',
    isProduction: false,
    isFetchingValidation: false,
    validationError: null
  };

  handleSubmit = async () => {
    const { packageJson, packageLock, ruleSet, isProduction } = this.state;
    this.setState({ isFetchingValidation: true });
    try {
      const { cid } = await validateByJson(
        packageJson,
        isValidJson(packageLock) ? packageLock : null,
        isValidJson(ruleSet) ? ruleSet : null,
        isProduction
      );
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

  handlePackageLockChange = packageLock => {
    this.setState({ packageLock });
  };

  handleRuleSetChange = ruleSet => {
    this.setState({ ruleSet });
  };

  isButtonDisabled() {
    const { packageJson, packageLock, ruleSet } = this.state;
    return !isValidJson(packageJson) || !isValidJson(packageLock, true) || !isValidJson(ruleSet, true);
  }

  render() {
    const { url, popularPackages, mdRules } = this.props;
    const { packageJson, isFetchingValidation, validationError, ruleSet } = this.state;
    return (
      <Page>
        <Tab
          pathname={url.pathname}
          inProgress={isFetchingValidation}
          popularPackages={popularPackages}
          mdRules={mdRules}
        >
          <Form>
            {validationError &&
              <Message negative>
                <p>{validationError}</p>
              </Message>}
            <Form.Field>
              <TextUploader
                label="package.json"
                placeholder="Insert your package.json"
                onChange={this.handlePackageJsonChange}
              />
            </Form.Field>
            <Form.Field>
              <CollapsableTextUploader
                title="package-lock.json"
                placeholder="Insert your package-lock.json"
                onChange={this.handlePackageLockChange}
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
            <Form.Field style={{ overflow: 'auto' }}>
              <Form.Button
                color="teal"
                size="big"
                content="Check"
                floated="right"
                onClick={this.handleSubmit}
                disabled={this.isButtonDisabled()}
              />
            </Form.Field>
          </Form>
        </Tab>
      </Page>
    );
  }
}
