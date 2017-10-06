import React from 'react';
import PropTypes from 'prop-types';
import { Container, Statistic, Message, Button } from 'semantic-ui-react';
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

  state = {
    showWarnings: false
  };

  handleShowWarningsClick = () => {
    this.setState({ showWarnings: true });
  };

  renderMessage = ({ type, evaluation, message, path }, index) => {
    return (
      <Message
        key={index}
        size="tiny"
        negative={type === 'ERROR'}
        warning={type === 'WARNING'}
        icon={getIconByType(type)}
        header={message}
        content={path.join(' > ')}
      />
    );
  };

  render() {
    const { rootEvaluation } = this.props;
    const { items, errorCount, warningCount } = getSummary(rootEvaluation);
    const errors = items.filter(({ type }) => type === 'ERROR');
    const warnings = items.filter(({ type }) => type === 'WARNING');
    const showWarnings = errors.length <= 10 || this.state.showWarnings;
    return (
      <Container>
        <Statistic.Group>
          <Statistic color="red" value={errorCount} label="Errors" />
          <Statistic color="orange" value={warningCount} label="Warnings" />
        </Statistic.Group>
        {errors.map(this.renderMessage)}
        {showWarnings
          ? warnings.map(this.renderMessage)
          : warnings.length > 0 &&
              <Button color="orange" content="Show warnings" onClick={this.handleShowWarningsClick} />}
      </Container>
    );
  }
}
