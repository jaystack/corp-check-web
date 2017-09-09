import React from 'react';
import Router from 'next/router';
import Head from '../components/Head';

export default class extends React.PureComponent {
  static async getInitialProps({ res, pathname }) {
    if (pathname === '/') {
      if (res) {
        res.writeHead(301, {
          Location: '/npm'
        });
        res.end();
      } else if (Router) {
        Router.push('/npm');
      }
    }
    return {};
  }

  render() {
    return null;
  }
}
