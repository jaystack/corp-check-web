import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { resultStatus } from '../api';

export default class extends React.PureComponent {
  render() {
    const { status } = this.props;
    return status === resultStatus.NONE
      ? null
      : <Grid centered columns={2}>
          <Grid.Column>
            <Segment>
              Yeee
            </Segment>
          </Grid.Column>
        </Grid>;
  }
}
