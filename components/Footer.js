import React from 'react';
import { Container, Menu, Icon } from 'semantic-ui-react';

export default () => (
  <footer>
    <Container>
      <div className="footerInner">
        <Menu icon borderless inverted secondary color="white">
          <Menu.Item name="twitter" className="twitter" href="https://twitter.com/Corp_JS" target="_blank">
            <Icon name="twitter" />
          </Menu.Item>
          <Menu.Item name="instagram" className="instagram" href="https://www.instagram.com/corpjs/" target="_blank">
            <Icon name="instagram" />
          </Menu.Item>
          <Menu.Item name="github" className="github" href="https://github.com/CorpJSBp" target="_blank">
            <Icon name="github" />
          </Menu.Item>
        </Menu>
        <div className="copyText">© Copyright - CorpJS.com 2017</div>
      </div>
      <a href="#" className="footer_logo " />
    </Container>
  </footer>
);
