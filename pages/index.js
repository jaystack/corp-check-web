import React from 'react';
import Head from '../components/Head';

export default class extends React.PureComponent {
  static async getInitialProps({ pathname }) {
    console.log(pathname)
    return {  };
  }

  render() {
    return (
      <div>
        <Head />
        
      </div>
    );
  }
}
