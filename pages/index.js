import React from 'react';

export default class extends React.PureComponent {
  static async getInitialProps({ res, pathname, url }) {
    if (pathname === '/') {
      if (res) {
        res.writeHead(301, {
          Location: '/npm'
        });
        res.end();
      } else {
        url.push('/npm');
      }
    }
    return {};
  }

  render() {
    return null;
  }
}
