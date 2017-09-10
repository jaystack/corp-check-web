import React from 'react';
import Head from '../components/Head';
import Result from '../components/Result';
import { getResult } from '../api';

export default class extends React.PureComponent {
  static async getInitialProps({ query }) {
    const { completed } = await getResult(query.cid);
    return { completed };
  }

  constructor(props) {
    super(props);
    this.state = { completed: props.completed };
  }

  render() {
    const { completed } = this.state;
    return (
      <div>
        <Head />
        <Result status={completed} />
      </div>
    );
  }
}
