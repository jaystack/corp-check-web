import React from 'react';
import { Container, Icon, Menu } from 'semantic-ui-react';

export default () => (
  <footer>
    <Container>
      <div className="footer-left">
        <a href="http://corpjs.com/" target="_blank" className="footer_logo corpjs">
          <img alt="corpjs-logo" src="/static/images/footer_logo.png" />
        </a>
        <Menu icon borderless inverted secondary>
          <Menu.Item name="twitter" className="twitter" href="https://twitter.com/Corp_JS" target="_blank">
            <Icon name="twitter" />
          </Menu.Item>
          <Menu.Item
            name="github"
            className="github"
            href="https://github.com/jaystack?q=corp-check-"
            target="_blank"
          >
            <Icon name="github" />
          </Menu.Item>
          <Menu.Item
            name="meetup"
            className="meetup"
            href="https://www.meetup.com/Corporate-JavaScript-Meetup-Budapest/?_cookie-check=SzKdy8Q7J7RtbpXd"
            target="_blank"
          >
            <Icon name="meetup" />
          </Menu.Item>
          <Menu.Item name="feedback" className="feedback" href="http://corpjs.com/feedback/" target="_blank">
            <Icon name="send" />
          </Menu.Item>
        </Menu>
      </div>
      <div className="footer-right">
        <a href="http://jaystack.com/" target="_blank" className="footer_logo jaystack">
          <img alt="jaystack-logo" src="/static/images/jaystacklogo_white_blue.png" />
        </a>
        <br/>
        <a href="http://jaystack.com/" target="_blank" className="link-1">
          <Icon name="wrench" /> All Developer Tools, Products <br/> and Solutions by JayStack
        </a>
        <span className="copy-text">© Copyright - CorpJS.com 2017</span>
      </div>
    </Container>
  </footer>
);