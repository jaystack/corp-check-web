import React from 'react';
import Router from 'next/router';
import Head from '../components/Head';
import Tab from '../components/Tab';
import { Search } from 'semantic-ui-react';
import { validateByName, searchNpm } from '../api';

export default class extends React.PureComponent {
  state = { value: '', results: [], isFetchingValidation: false, isFetchingSuggestions: false };

  handleSubmit = async () => {
    this.setState({ isFetchingValidation: true });
    try {
      const { cid } = await validateByName(this.state.value);
      if (cid) Router.push({ pathname: '/result', query: { cid } });
    } catch (error) {
    } finally {
      this.setState({ isFetchingValidation: false });
    }
  };

  handleKeyUp = evt => {
    if (evt.keyCode === 13) this.handleSubmit();
  };

  handleChange = async (evt, { value }) => {
    this.setState({ value, isFetchingSuggestions: true });
    try {
      const results = value.length >= 3 ? await searchNpm(value) : [];
      this.setState({ results, isFetchingSuggestions: false });
    } catch (error) {
      this.setState({ results: [], isFetchingSuggestions: false });
    }
  };

  render() {
    const { url } = this.props;
    const { value, results, isFetchingValidation, isFetchingSuggestions } = this.state;
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
            loading={isFetchingSuggestions}
            onKeyUp={this.handleKeyUp}
            action={{ content: 'Check', color: 'teal', onClick: this.handleSubmit, disabled: !value }}
            onResultSelect={this.handleSubmit}
            placeholder="npm package"
          />
        </Tab>
      </div>
    );
  }
}
