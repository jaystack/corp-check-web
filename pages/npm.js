import React from 'react';
import Router from 'next/router';
import Head from '../components/Head';
import Tab from '../components/Tab';
import Result from '../components/Result';
import { Input } from 'semantic-ui-react';
import { validateByName, getResult, resultStatus } from '../api';

export default class extends React.PureComponent {
  static async getInitialProps({ query }) {
    console.log("getInitialProps")
    const { status } = await getResult(query.cid);
    return { status };
  }

  state = { value: '' };

  handleSubmit = async () => {
    const { cid } = await validateByName(this.state.value);
    Router.push({
      pathname: this.props.pathname,
      query: { cid }
    });
  };

  handleKeyUp = evt => {
    if (evt.keyCode === 13) this.handleSubmit();
  };

  handleChange = evt => {
    this.setState({ value: evt.target.value });
  };

  render() {
    console.log(this.props)
    const { value } = this.state;
    const { url, status } = this.props;
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
        <Result status={status} />
      </div>
    );
  }
}
