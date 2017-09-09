import React from 'react';
import Head from '../components/Head';

export default class extends React.PureComponent {
  static async getInitialProps({ res, pathname, url }) {
    if (pathname === '/') {
      if (res) {
        res.writeHead(301, {
          Location: '/npm'
        });
        res.end();
      } else if (Router) {
        url.push('/npm');
      }
    }
    return {};
  }

  render() {
    return null;
  }
}
