import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Statistic, Item, Message } from 'semantic-ui-react';
import getSummary from '../utils/getSummary';

const getIconByType = type => {
  switch (type) {
    case 'ERROR':
      return 'announcement';
    case 'WARNING':
      return 'warning sign';
    default:
      return '';
  }
};

export default class extends React.PureComponent {
  static propTypes = {
    rootEvaluation: PropTypes.any.isRequired
  };

  render() {
    const { rootEvaluation } = this.props;
    const { items, errorCount, warningCount } = getSummary(rootEvaluation);
    return (
      <Container>
        <Statistic.Group>
          <Statistic color="red" value={errorCount} label="Errors" />
          <Statistic color="orange" value={warningCount} label="Warnings" />
        </Statistic.Group>
        {items.map(({ type, evaluation, message, path }, index) => (
          <Message
            key={index}
            size="tiny"
            negative={type === 'ERROR'}
            warning={type === 'WARNING'}
            icon={getIconByType(type)}
            header={message}
            content={path.join(' > ')}
          />
        ))}
      </Container>
    );
  }
}
