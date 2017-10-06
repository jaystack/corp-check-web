import React from 'react';
import PropTypes from 'prop-types';
import { Item, Message } from 'semantic-ui-react';
import createSummary from '../utils/createSummary';

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
    //console.log(rootEvaluation);
    const summary = createSummary(rootEvaluation);
    console.log(summary);
    return (
      <Item.Group>
        {summary.map(({ name: type, items: evaluations }) => (
          <Item key={type}>
            <Item.Content>
              <Item.Description>
                <Item.Group>
                  {evaluations.map(({ name: evaluationName, items: evaluations }) => (
                    <Item key={evaluationName}>
                      <Item.Content>
                        <Item.Description>
                          <Item.Group>
                            {evaluations.map(({ type, evaluation, message, path }, index) => (
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
                          </Item.Group>
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  ))}
                </Item.Group>
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  }
}
