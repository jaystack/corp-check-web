import React from 'react';
import { Accordion, Form, TextArea } from 'semantic-ui-react';
import isValidJson from '../utils/isValidJson';

export default class extends React.PureComponent {
  renderFormField() {
    const { value = '', onChange = () => {} } = this.props;
    return (
      <Form.Field error={!isValidJson(value)}>
        <TextArea
          value={value}
          onChange={onChange}
          autoHeight
          placeholder="Describe your own rules"
          style={{ minHeight: '300px', width: '100%', fontFamily: 'Courier New' }}
        />
      </Form.Field>
    );
  }

  render() {
    const { inForm = false } = this.props;
    return (
      <Accordion
        panels={[
          {
            title: 'Rules',
            content: (
              <Accordion.Content key="textarea">
                {inForm ? this.renderFormField() : <Form>{this.renderFormField()}</Form>}
              </Accordion.Content>
            )
          }
        ]}
      />
    );
  }
}
