import React from 'react';
import { LogType } from 'corp-check-core';
import { Card, Icon, Header, Accordion, Message, List, Popup } from 'semantic-ui-react';

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

const getIconColorByCounts = (errorCount, warningCount) => {
  if (errorCount) return 'red';
  else if (warningCount) return 'green';
  else return 'green';
};

const getIconByCounts = (errorCount, warningCount) => {
  if (errorCount) return 'remove';
  else if (warningCount) return 'checkmark';
  else return 'checkmark';
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

const getFullDescriptionOfEvaluation = evaluation => {
  switch (evaluation) {
    case 'license':
      return 'There are licenses which are safe. There are licenses which simply prohibit using the module unless you meet certain criteria. And there are licenses which are viral, and for example will force your software to be open source and be published under the same terms as the included module.';
    case 'version':
      return 'You don’t want to deploy something that’s not complete, right? So why use packages which are not finished? Breaking changes are sure to happen once they are released, meaning your code will have to be changed significantly as well.';
    case 'npm-scores':
      return 'Is the package maintained regularly? Are the issues addressed properly? Is it mature enough? Are there enough users so it can be considered well tested?';
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

const filterByPath = max => items => items.filter(({ path }) => path.length <= max);
const getItemsOf = type => items => (items.find(({ name }) => name === type) || { items: [] }).items;
const getLastItemOf = items => items[items.length - 1];

export default class extends React.PureComponent {
  state = { isOpen: false };

  handleHelpClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { name, items } = this.props;
    const { isOpen } = this.state;
    const maxPath = getMaxPathByEvaluation(name);
    const errors = filterByPath(maxPath)(getItemsOf(LogType.ERROR)(items));
    const warnings = filterByPath(maxPath)(getItemsOf(LogType.WARNING)(items));
    const infos = filterByPath(maxPath)(getItemsOf(LogType.INFO)(items));
    return (
      <Card>
        <Card.Content extra>
          <Icon
            color={getIconColorByCounts(errors.length, warnings.length)}
            circular
            inverted
            size="big"
            name={getIconByCounts(errors.length, warnings.length)}
            style={{ position: 'absolute' }}
          />
          <Icon
            link
            onClick={this.handleHelpClick}
            color="grey"
            size="large"
            name={isOpen ? 'question circle' : 'question circle outline'}
            style={{ position: 'absolute', right: '10px' }}
          />
          <Header as="h2" icon color="grey">
            <Icon name={getIconOfEvaluation(name)} />
            <Header.Content>{`${getEvaluationDisplayName(name).toUpperCase()} CHECK`}</Header.Content>
          </Header>
          <Card.Description>
            <p>{getDescriptionOfEvaluation(name)}</p>
            {isOpen && <p>{getFullDescriptionOfEvaluation(name)}</p>}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          {errors.length > 0 || warnings.length > 0 || infos.length > 0 ? (
            <Accordion
              exclusive={false}
              panels={[
                getTypePanel(name, 'error', errors, 'red', 'announcement'),
                getTypePanel(name, 'warning', warnings, 'orange', 'warning sign'),
                getTypePanel(name, 'info', infos, 'grey', 'info')
              ].filter(_ => _)}
            />
          ) : (
            <Accordion>
              <Accordion.Title style={{ cursor: 'default' }}>
                <b>Everything was fine</b>
              </Accordion.Title>
            </Accordion>
          )}
        </Card.Content>
      </Card>
    );
  }
}

const getTypePanel = (evaluation, type, items, color, icon) =>
  items.length > 0
    ? {
        title: (
          <Accordion.Title key={`${type}-title`}>
            <Icon name={icon} color={color} />
            <span style={{ userSelect: 'none' }}>
              {`We have found ${items.length}`}{' '}
              <b>{`${getEvaluationDisplayName(evaluation)} ${type}${items.length > 1 && type !== 'info'
                ? 's'
                : ''}`}</b>
            </span>
          </Accordion.Title>
        ),
        content: (
          <Accordion.Content key={`${type}-content`}>
            <Message size="small" color={color}>
              <List>
                {items.map(({ message, path }, i) => (
                  <Popup
                    key={i}
                    trigger={
                      <List.Item>
                        {message} in <b>{getLastItemOf(path)}</b>
                      </List.Item>
                    }
                  >
                    {path.join(' > ')}
                  </Popup>
                ))}
              </List>
            </Message>
          </Accordion.Content>
        )
      }
    : null;
