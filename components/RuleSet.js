import React from 'react';
import { Accordion, Form, TextArea } from 'semantic-ui-react';
import TextUploader from './TextUploader';
import isValidJson from '../utils/isValidJson';

export default class extends React.PureComponent {
  render() {
    const { onChange = () => {} } = this.props;
    return (
      <Accordion
        panels={[
          {
            title: 'Rules',
            content: (
              <Accordion.Content key="textarea">
                <TextUploader onChange={onChange} placeholder="Describe your rules" />
              </Accordion.Content>
            )
          }
        ]}
      />
    );
  }
}
