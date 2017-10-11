import React from 'react';
import PropTypes from 'prop-types';
import { Container, Statistic, Message, Button } from 'semantic-ui-react';
import getListing from '../utils/getListing';

const getIconByType = type => {
  switch (type) {
    case 'ERROR':
      return 'announcement';
    case 'WARNING':
      return 'warning sign';
    default:
      return 'info circle';
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
    const { showWarnings } = this.state;
    const { items, errorCount, warningCount } = getListing(rootEvaluation);
    const errors = items.filter(({ type }) => type === 'ERROR');
    const warnings = items.filter(({ type }) => type === 'WARNING');
    const infos = items.filter(({ type }) => type === 'INFO');
    return (
      <Container>
        <div>
          <Statistic.Group>
            <Statistic color="red" value={errorCount} label={errorCount > 1 ? 'Errors' : 'Error'} horizontal />
            <Statistic
              color="orange"
              value={warningCount}
              label={warningCount > 1 ? 'Warnings' : 'Warning'}
              horizontal
            />
          </Statistic.Group>
        </div>
        {errors.map(this.renderMessage)}
        {showWarnings || errors.length === 0
          ? warnings.map(this.renderMessage)
          : warnings.length > 0 &&
              <Button color="orange" content="Show warnings" onClick={this.handleShowWarningsClick} />}
        {errors.length === 0 && warnings.length === 0 && infos.map(this.renderMessage)}
      </Container>
    );
  }
}
