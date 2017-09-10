import React from 'react';
import Router from 'next/router';
import Head from '../components/Head';
import Tab from '../components/Tab';
import Result from '../components/Result';
import { Input } from 'semantic-ui-react';
import { validateByName, getResult } from '../api';

export default class extends React.PureComponent {
  state = { value: '' };

  handleSubmit = async () => {
    const { cid } = await validateByName(this.state.value);
    Router.push({ pathname: '/result', query: { cid } });
  };

  handleKeyUp = evt => {
    if (evt.keyCode === 13) this.handleSubmit();
  };

  handleChange = evt => {
    this.setState({ value: evt.target.value });
  };

  render() {
    const { value, status } = this.state;
    const { url } = this.props;
    return (
      <div>
        <Head />
        <Tab pathname={url.pathname}>
          <Input
            size="massive"
            fluid
            value={value}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            action={{ content: 'Go', color: 'teal', onClick: this.handleSubmit }}
            placeholder="npm package"
          />
        </Tab>
      </div>
    );
  }
}
