import React from 'react';
import { Grid, Container, Icon, Menu } from 'semantic-ui-react';
import ReactRotatingText from 'react-rotating-text';

export default () => (
  <header>
    <nav>
      <Container>
        <h2 id="logo">
          <a href="/">CorpJS - Corp Check</a>
        </h2>
        <div className="headerInner">
          <div className="slogan">
            Every{' '}
            <strong>
              <ReactRotatingText
                pause={3500}
                typingInterval={75}
                items={['module', 'package', 'system', 'application', 'service']}
              />
            </strong>{' '}
            is just as weak as its weakest dependency
          </div>
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
            <Menu.Item name="feedback" className="feedback" href="http://corpjs.com/feedback/" target="_blank">
              <Icon name="send" />
            </Menu.Item>
          </Menu>
        </div>
      </Container>
    </nav>
  </header>
);
