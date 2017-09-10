import React from 'react';
import { Label, Grid, Segment } from 'semantic-ui-react';
import Head from '../components/Head';
import { getResult } from '../api';

export default class extends React.PureComponent {
  static async getInitialProps({ query }) {
    const result = await getResult(query.cid);
    return { result };
  }

  constructor(props) {
    super(props);
    this.state = { completed: props.result.completed };
  }

  render() {
    const { result } = this.props;
    const { completed } = this.state;
    return (
      <div>
        <Head />
        <Grid centered columns={2}>
          <Grid.Column>
            <Segment loading={!completed}>
              <Label as="a" color="red" ribbon>Rejected</Label>
              <br />
              <Label as="a" color="orange" ribbon>Accepted</Label>
              <br />
              <Label as="a" color="green" ribbon>Recommended</Label>
              <h1>{result.name}</h1>
              {completed ? 'Completed' : 'Pending'}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
