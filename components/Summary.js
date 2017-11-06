import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { getSummary } from 'corp-check-core';
import SummaryCard from './SummaryCard';

export default class extends React.PureComponent {
  static propTypes = {
    rootEvaluation: PropTypes.any.isRequired
  };

  renderCard = ({ name, items }) => <SummaryCard key={name} name={name} items={items} />;

  render() {
    const { rootEvaluation } = this.props;
    const summary = getSummary(rootEvaluation);
    return (
      <Card.Group stackable itemsPerRow={3}>
        {summary.map(this.renderCard)}
      </Card.Group>
    );
  }
}
