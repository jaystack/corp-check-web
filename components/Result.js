import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';

export default class extends React.PureComponent {
  render() {
    const { completed } = this.props;
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment loading={!completed} padded='very'>
            {completed ? 'Completed' : 'Pending'}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
