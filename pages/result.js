import React from 'react';
import { Grid, Segment, Message } from 'semantic-ui-react';
import Result from '../components/Result';
import { getResult, sleep } from '../api';

const RETRY = 1500;

export default class extends React.PureComponent {
  static async getInitialProps({ query }) {
    try {
      const result = await getResult(query.cid);
      return { result, error: result.state === 'FAILED' ? 'Something went wrong' : null };
    } catch (error) {
      return { result: { completed: true, state: 'FAILED' }, error: error.message };
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      result: props.result,
      error: props.error
    };
  }

  fetchResult = async () => {
    try {
      const result = await getResult(this.props.url.query.cid);
      if (result.state === 'PENDING') return;
      this.stopRetry();
      this.setState({ result, error: result.state === 'FAILED' ? 'Something went wrong' : null });
    } catch (error) {
      this.stopRetry();
      this.setState({ error: error.message });
    }
  };

  startRetry() {
    this.timer = setInterval(this.fetchResult, RETRY);
  }

  stopRetry() {
    clearTimeout(this.timer);
  }

  componentDidMount() {
    if (!this.state.result.completed) this.startRetry();
  }

  componentWillUnmount() {
    this.stopRetry();
  }

  render() {
    const { result, error } = this.state;
    return (
      <div className="result-page">
        <Segment loading={!result.completed && !error} padded={!result.completed && 'very'}>
          {result.completed && !error && <Result result={result} />}
          {error &&
            <Message negative>
              <p>{error}</p>
            </Message>}
        </Segment>
      </div>
    );
  }
}
