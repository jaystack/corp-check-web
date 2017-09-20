import React from 'react';
import Router from 'next/router';
import Tab from '../components/Tab';
import { Search, Message } from 'semantic-ui-react';
import { validateByName, getNpmSuggestions, splitNameAndVersion, getNpmVersionSuggestions } from '../api';

const TYPING_TIMEOUT = 300;

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

  render() {
    const { url } = this.props;
    const { value, results, isFetchingValidation, isFetchingSuggestions, validationError } = this.state;
    return (
      <Tab pathname={url.pathname} inProgress={isFetchingValidation}>
        <Search
          ref="search"
          size="large"
          fluid
          className="search-fluid-fix"
          results={results}
          value={value}
          onSearchChange={this.handleChange}
          minCharacters={3}
          loading={isFetchingSuggestions}
          onResultSelect={this.handleResultSelect}
          onKeyDown={this.handleKeyDown}
          placeholder="npm package"
          showNoResults={false}
        />
        {validationError &&
          <Message negative>
            <p>{validationError}</p>
          </Message>}
      </Tab>
    );
  }
}
