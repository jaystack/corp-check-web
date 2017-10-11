import React from 'react';
import { List, Label } from 'semantic-ui-react';
import { getQualificationColor } from '../utils/qualification';
import getPercentage from '../utils/getPercentage';

export default class extends React.PureComponent {
  render() {
    const { popularPackages } = this.props;
    return (
      <List divided verticalAlign="middle">
        {popularPackages.map(({ name, qualification, score, cid }) => (
          <List.Item key={name} as="a" href={`/result?cid=${cid}`}>
            <List.Content floated="left">
              {name}
            </List.Content>
            <List.Content floated="right">
              <Label circular color={getQualificationColor(qualification)} size="mini">
                {getPercentage(score)}%
              </Label>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}
