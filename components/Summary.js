import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Card, Icon, Header } from 'semantic-ui-react';
import getSummary from '../utils/getSummary';

const getIconOfEvaluation = evaluation => {
  switch (evaluation) {
    case 'license':
      return 'law';
    case 'version':
      return 'rocket';
    case 'npm-scores':
      return 'percent';
  }
};

const getDescriptionOfEvaluation = evaluation => {
  switch (evaluation) {
    case 'license':
      return 'Discover breaking licenses in dependencies';
    case 'version':
      return 'Discover unreleased versions in dependencies';
    case 'npm-scores':
      return 'Get quantitative data about the packages';
  }
};

export default class extends React.PureComponent {
  static propTypes = {
    rootEvaluation: PropTypes.any.isRequired
  };

  renderCards = ({ name }) => {
    return (
      <Grid.Column key={name}>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              <Header as="h3" icon={getIconOfEvaluation(name)} content={`${name.toUpperCase()} CHECK`} />
            </Card.Header>
            <Card.Description>
              {getDescriptionOfEvaluation(name)}
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            lorem ipsum dolor it samet
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  };

  render() {
    const { rootEvaluation } = this.props;
    const summary = getSummary(rootEvaluation);
    console.log(summary);
    return (
      <Container>
        <Grid columns="equal">
          <Grid.Row>
            {summary.map(this.renderCards)}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
