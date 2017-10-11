import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Card, Image, Icon, Header, Accordion } from 'semantic-ui-react';
import getSummary from '../utils/getSummary';

const getIconOfEvaluation = evaluation => {
  switch (evaluation) {
    case 'license':
      return 'law';
    case 'version':
      return 'rocket';
    case 'npm-scores':
      return 'line chart';
  }
};

const getIconByCounts = (errorCount, warningCount) => {
  if (errorCount) return 'remove';
  else if (warningCount) return 'checkmark';
  else return 'checkmark';
};

const getIconColorByCounts = (errorCount, warningCount) => {
  if (errorCount) return 'red';
  else if (warningCount) return 'green';
  else return 'green';
};

const getDescriptionOfEvaluation = evaluation => {
  switch (evaluation) {
    case 'license':
      return 'Discovering breaking licenses in dependencies';
    case 'version':
      return 'Discovering unreleased versions in dependencies';
    case 'npm-scores':
      return 'Getting quantitative data about the packages';
  }
};

const getEvaluationDisplayName = evaluation => {
  switch (evaluation) {
    case 'npm-scores':
      return 'score';
    default:
      return evaluation;
  }
};

const getCountOf = type => ({ items }) => (items.find(({ name }) => name === type) || { items: [] }).items.length;

const getTypePanel = (evaluation, type, count, color, icon) =>
  (count
    ? {
        title: (
          <Accordion.Title key={`${type}-title`}>
            <Icon name={icon} color={color} />
            <span
              style={{ userSelect: 'none' }}
            >{`There ${count > 1 ? 'were' : 'was'} found ${count} ${getEvaluationDisplayName(evaluation)} ${type}${count > 1 ? 's' : ''}`}</span>
          </Accordion.Title>
        ),
        content: <Accordion.Content key={`${type}-content`}>...</Accordion.Content>
      }
    : null);

export default class extends React.PureComponent {
  static propTypes = {
    rootEvaluation: PropTypes.any.isRequired
  };

  renderCards = ({ name, items }) => {
    const errorCount = getCountOf('ERROR')({ items });
    const warningCount = getCountOf('WARNING')({ items });
    return (
      <Card key={name}>
        <Card.Content extra>
          <Icon
            color={getIconColorByCounts(errorCount, warningCount)}
            circular
            inverted
            size="big"
            name={getIconByCounts(errorCount, warningCount)}
            style={{ position: 'absolute' }}
          />
          <Header as="h2" icon color="grey">
            <Icon name={getIconOfEvaluation(name)} />
            <Header.Content>
              {`${getEvaluationDisplayName(name).toUpperCase()} CHECK`}
            </Header.Content>
          </Header>
          <Card.Description>
            {getDescriptionOfEvaluation(name)}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Accordion
            exclusive={false}
            panels={[
              getTypePanel(name, 'error', errorCount, 'red', 'announcement'),
              getTypePanel(name, 'warning', warningCount, 'orange', 'warning sign')
            ].filter(_ => _)}
          />
        </Card.Content>
      </Card>
    );
  };

  render() {
    const { rootEvaluation } = this.props;
    const summary = getSummary(rootEvaluation);
    console.log(summary);
    return (
      <Card.Group stackable itemsPerRow={3}>
        {summary.map(this.renderCards)}
      </Card.Group>
    );
  }
}
