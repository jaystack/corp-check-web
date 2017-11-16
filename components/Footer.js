import React from 'react';
import { Container } from 'semantic-ui-react';

export default () => (
  <footer>
    <Container>
      <a href="http://jaystack.com/">
        <img alt="jaystack-logo" src="/static/images/jaystacklogo_white_blue.png" className="footer_jaystack_logo" />
      </a>
      <a href="http://corpjs.com/" className="footer_logo ">
        <img alt="corpjs-logo" src="/static/images/footer_logo.png" className="footer_logo" />
      </a>
    </Container>
  </footer>
);
