import React from 'react';
import Head from '../components/Head';
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

export default class extends React.PureComponent {
  render() {
    return (
      <div>
        <Head />
        <div className="ui buttons">
          <Button size='huge' className="ui button">NPM package</Button>
          <Button size='huge' className="ui button">Your package.json</Button>
        </div>
        <Input size='massive' action='Search' placeholder='Search...' />
      </div>
    );
  }
}
