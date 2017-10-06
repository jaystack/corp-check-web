import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class extends React.PureComponent {
  render() {
    return (
      <div id="root">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
