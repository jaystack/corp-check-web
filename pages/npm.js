import React from 'react';
import Router from 'next/router';
import Page from '../components/Page';
import Tab from '../components/Tab';
import CollapsableTextUploader from '../components/CollapsableTextUploader';
import { Search, Message, Form } from 'semantic-ui-react';
import { isValidJson } from 'corp-check-core';
import {
  validateByName,
  getNpmSuggestions,
  splitNameAndVersion,
  getNpmVersionSuggestions,
  getPopularPackages,
  getRulesReadme,
  getCliReadme,
  getBadgesReadme
} from '../api';

const TYPING_TIMEOUT = 300;

export default class extends React.PureComponent {
  static async getInitialProps() {
    const popularPackages = await getPopularPackages();
    const mdRules = await getRulesReadme();
    const mdCli = await getCliReadme();
    const mdBadges = await getBadgesReadme();
    return { popularPackages, mdRules, mdCli, mdBadges };
  }

  state = {
    value: '',
    results: [],
    isFetchingValidation: false,
    isFetchingSuggestions: false,
    validationError: null,
    ruleSet: ''
  };

  async submit(name) {
    const { ruleSet } = this.state;
    this.setState({ isFetchingValidation: true });
    try {
      const { cid } = await validateByName(name, isValidJson(ruleSet) ? ruleSet : null);
      this.setState({ validationError: null });
      if (cid) Router.push({ pathname: '/result', query: { cid } });
    } catch (error) {
      this.setState({ validationError: error.message });
    } finally {
      this.setState({ isFetchingValidation: false });
    }
  }

  handleResultSelect = (evt, { result }) => {
    this.setState({ value: result.title }, () => this.submit(result.title));
  };

  handleSearchChange = async (evt, { value }) => {
    this.setState({ value });
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(async () => {
      this.setState({ isFetchingSuggestions: true });
      const { name, version } = splitNameAndVersion(value);
      try {
        const results = await getNpmSuggestions(name, version);
        this.setState({ results, isFetchingSuggestions: false });
      } catch (error) {
        this.setState({ results: [], isFetchingSuggestions: false });
      }
    }, TYPING_TIMEOUT);
  };

  handleKeyDown = evt => {
    const { value } = this.state;
    if (evt.keyCode === 13 && this.refs.search.state.selectedIndex === -1 && value.length > 0) this.submit(value);
  };

  handleRuleSetChange = ruleSet => {
    this.setState({ ruleSet });
  };

  handleSubmit = () => {
    this.submit(this.state.value);
  };

  isButtonDisabled() {
    return !this.state.value;
  }

  render() {
    const { url, popularPackages, mdRules, mdCli, mdBadges } = this.props;
    const { value, results, isFetchingValidation, isFetchingSuggestions, validationError, ruleSet } = this.state;
    return (
      <Page>
        <Tab
          pathname={url.pathname}
          inProgress={isFetchingValidation}
          popularPackages={popularPackages}
          mdRules={mdRules}
          mdCli={mdCli}
          mdBadges={mdCli}
        >
          <Search
            ref="search"
            size="large"
            fluid
            className="search-fluid-fix"
            results={results}
            value={value}
            onSearchChange={this.handleSearchChange}
            minCharacters={3}
            loading={isFetchingSuggestions}
            onResultSelect={this.handleResultSelect}
            onKeyDown={this.handleKeyDown}
            placeholder="Enter package name"
            showNoResults={false}
          />
          {validationError && (
            <Message negative>
              <p>{validationError}</p>
            </Message>
          )}
          <Form>
            <Form.Field>
              <CollapsableTextUploader
                title="Rules"
                placeholder="Describe your rules"
                onChange={this.handleRuleSetChange}
              />
            </Form.Field>
            <Form.Field style={{ overflow: 'auto' }}>
              <Form.Button
                content="Check"
                color="teal"
                size="big"
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
