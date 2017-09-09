import React from 'react';
import Head from '../components/Head';
import Tab from '../components/Tab';
import { Input } from 'semantic-ui-react';

export default class extends React.PureComponent {
  static async getInitialProps({ pathname }) {
    return { pathname };
  }

  render() {
    return (
      <div>
        <Head />
        <Tab pathname={this.props.pathname}>
          <Input size="massive" fluid action={{ content: 'Go', color: 'teal' }} placeholder="npm package" />
        </Tab>
      </div>
    );
  }
}
