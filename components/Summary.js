import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Icon, Header, Accordion, List, Message, Popup } from 'semantic-ui-react';
import getSummary from '../utils/getSummary';

const getMaxPathByEvaluation = evaluation => {
  switch (evaluation) {
    case 'npm-scores':
      return 1;
    default:
      return Infinity;
  }
};

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
      return 'attribute';
    default:
      return evaluation;
  }
};

const getItemsOf = type => items => (items.find(({ name }) => name === type) || { items: [] }).items;
const filterByPath = max => items => items.filter(({ path }) => path.length <= max);

const getTypePanel = (evaluation, type, items, color, icon) =>
  (items.length > 0
    ? {
        title: (
          <Accordion.Title key={`${type}-title`}>
            <Icon name={icon} color={color} />
            <span style={{ userSelect: 'none' }}>
              {`We have found ${items.length}`}
              {' '}
              <b>{`${getEvaluationDisplayName(evaluation)} ${type}${items.length > 1 ? 's' : ''}`}</b>
            </span>
          </Accordion.Title>
        ),
        content: (
          <Accordion.Content key={`${type}-content`}>
            <Message size="small" color={color}>
              <List>
                {items.map(({ message, path }, i) => (
                  <Popup key={i} trigger={<List.Item>{message}</List.Item>}>{path.join(' > ')}</Popup>
                ))}
              </List>
            </Message>
          </Accordion.Content>
        )
      }
    : null);

export default class extends React.PureComponent {
  static propTypes = {
    rootEvaluation: PropTypes.any.isRequired
  };

  renderCards = ({ name, items }) => {
    const maxPath = getMaxPathByEvaluation(name);
    const errors = filterByPath(maxPath)(getItemsOf('ERROR')(items));
    const warnings = filterByPath(maxPath)(getItemsOf('WARNING')(items));
    const infos = filterByPath(maxPath)(getItemsOf('INFO')(items));
    return (
      <Card key={name}>
        <Card.Content extra>
          <Icon
            color={getIconColorByCounts(errors.length, warnings.length)}
            circular
            inverted
            size="big"
            name={getIconByCounts(errors.length, warnings.length)}
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
          {errors.length > 0 || warnings.length > 0 || infos.length > 0
            ? <Accordion
                exclusive={false}
                panels={[
                  getTypePanel(name, 'error', errors, 'red', 'announcement'),
                  getTypePanel(name, 'warning', warnings, 'orange', 'warning sign'),
                  getTypePanel(name, 'info', infos, 'grey', 'info')
                ].filter(_ => _)}
              />
            : <h4>Everything was fine</h4>}
        </Card.Content>
      </Card>
    );
  };

  render() {
    const { rootEvaluation } = this.props;
    const summary = getSummary(rootEvaluation);
    return (
      <Card.Group stackable itemsPerRow={3}>
        {summary.map(this.renderCards)}
      </Card.Group>
    );
  }
}
