import React from 'react';
import { Container } from 'semantic-ui-react';

export default () => (
  <footer>
    <Container>

      <a href="http://jaystack.com/" target="_blank" className="footer_logo jaystack">
        <img alt="jaystack-logo" src="/static/images/jaystacklogo_white_blue.png" />
        <span>Corporate products from JayStack</span>
      </a>
      <a href="http://corpjs.com/" target="_blank" className="footer_logo corpjs">
        <img alt="corpjs-logo" src="/static/images/footer_logo.png" />
      </a>
    </Container>
  </footer>
);
