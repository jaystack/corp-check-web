import React from 'react';
import Router from 'next/router';
import Head from '../components/Head';
import Tab from '../components/Tab';
import Result from '../components/Result';
import { Input } from 'semantic-ui-react';
import { validateByName } from '../api';

export default class extends React.PureComponent {
  state = { value: '', inProgress: false };

  handleSubmit = async () => {
    this.setState({ inProgress: true });
    const { cid } = await validateByName(this.state.value);
    if (cid) Router.push({ pathname: '/result', query: { cid } });
    this.setState({ inProgress: false });
  };

  handleKeyUp = evt => {
    if (evt.keyCode === 13) this.handleSubmit();
  };

  handleChange = evt => {
    this.setState({ value: evt.target.value });
  };

  render() {
    const { url } = this.props;
    const { value, inProgress } = this.state;
    return (
      <div>
        <Head />
        <Tab pathname={url.pathname} inProgress={inProgress}>
          <Input
            size="massive"
            fluid
            value={value}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            action={{ content: 'Check', color: 'teal', onClick: this.handleSubmit }}
            placeholder="npm package"
          />
        </Tab>
      </div>
    );
  }
}
