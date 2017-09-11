import React from 'react';
import { Grid, Segment, Message } from 'semantic-ui-react';
import Head from '../components/Head';
import Result from '../components/Result';
import { getResult, sleep } from '../api';

export default class extends React.PureComponent {
  static async getInitialProps({ query }) {
    const result = await getResult(query.cid);
    return { result };
  }

  constructor(props) {
    super(props);
    this.state = { result: props.result, error: null };
  }

  async retryFetchResult() {
    if (this.state.result.completed) return;
    try {
      const result = await getResult(this.props.url.query.cid);
      if (result.completed) {
        this.setState({ result, error: null });
      } else {
        await sleep(3000);
        this.retryFetchResult();
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  componentDidMount() {
    this.retryFetchResult();
  }

  render() {
    const { result, error } = this.state;
    return (
      <div>
        <Head />
        <Grid centered columns={2}>
          <Grid.Column>
            <Segment loading={!result.completed && !error} padded={!result.completed && 'very'}>
              {result.completed && <Result result={result} />}
              {error &&
                <Message negative>
                  <p>{error}</p>
                </Message>}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
