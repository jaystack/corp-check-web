import React from 'react';
import Head from '../components/Head';
import Tab from '../components/Tab';
import { Form, TextArea, Button } from 'semantic-ui-react';

export default class extends React.PureComponent {
  static async getInitialProps({ pathname }) {
    return { pathname };
  }

  render() {
    return (
      <div>
        <Head />
        <Tab pathname={this.props.pathname}>
          <Form>
            <Form.Field>
              <TextArea
                autoHeight
                placeholder="Insert your package.json"
                style={{ minHeight: '300px', width: '100%', fontFamily: 'Courier New' }}
              />
            </Form.Field>
            <Form.Field>
              <Button size="big">Go</Button>
            </Form.Field>
          </Form>
        </Tab>
      </div>
    );
  }
}
