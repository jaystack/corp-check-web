import React from 'react';
import { Grid, Segment, Message, Container, Progress } from 'semantic-ui-react';
import Page from '../components/Page';
import Result from '../components/Result';
import { getResult, sleep } from '../api';

const RETRY = 1500;

export default class extends React.PureComponent {
  static async getInitialProps({ query }) {
    try {
      const result = await getResult(query);
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
      const result = await getResult(this.props.url.query);
      if (result.state === 'PENDING') {
        this.setState({ result });
        return;
      }
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
    const loading = !result.completed && !error;
    const progress = result && result.progress;
    return (
      <Page>
        <div className="result-page">
          <Container>
            <Grid columns={16}>
              <Grid.Column largeScreen={16} mobile={16}>
                <Segment padded={!result.completed && 'very'}>
                  {loading &&
                  progress && (
                    <Progress
                      value={progress.value}
                      total={progress.total}
                      progress="ratio"
                      active
                      size="large"
                      color="teal"
                    >
                      {progress.message} ...
                    </Progress>
                  )}
                  {result.completed && !error && <Result result={result} />}
                  {error && (
                    <Message negative>
                      <p>{error}</p>
                    </Message>
                  )}
                </Segment>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </Page>
    );
  }
}
