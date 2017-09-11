import React from 'react';
import Router from 'next/router';
import Head from '../components/Head';
import Tab from '../components/Tab';
import { Search, Message } from 'semantic-ui-react';
import { validateByName, getNpmSuggestions } from '../api';

export default class extends React.PureComponent {
  state = { value: '', results: [], isFetchingValidation: false, isFetchingSuggestions: false, validationError: null };

  async submit(name) {
    this.setState({ isFetchingValidation: true });
    try {
      const { cid } = await validateByName(name);
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

  handleChange = async (evt, { value }) => {
    this.setState({ value });
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      this.setState({ isFetchingSuggestions: true });
      try {
        const results = await getNpmSuggestions(value);
        this.setState({ results, isFetchingSuggestions: false });
      } catch (error) {
        this.setState({ results: [], isFetchingSuggestions: false });
      }
    }, 300);
  };

  render() {
    const { url } = this.props;
    const { value, results, isFetchingValidation, isFetchingSuggestions, validationError } = this.state;
    return (
      <div>
        <Head />
        <Tab pathname={url.pathname} inProgress={isFetchingValidation}>
          <Search
            size="large"
            fluid
            className="search-fluid-fix"
            results={results}
            value={value}
            onSearchChange={this.handleChange}
            minCharacters={3}
            loading={isFetchingSuggestions}
            onResultSelect={this.handleResultSelect}
            placeholder="npm package"
          />
          {validationError &&
            <Message negative>
              <p>{validationError}</p>
            </Message>}
        </Tab>
      </div>
    );
  }
}
