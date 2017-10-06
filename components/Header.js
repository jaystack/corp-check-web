import React from 'react';
import { Grid, Container, Icon, Menu } from 'semantic-ui-react';
import ReactRotatingText from 'react-rotating-text';

export default () => (
    <header>
        <nav>
            <Container>
                <h2 id="logo"><a href="http://corpjs.com/">CorpJS - Corp Check</a></h2>
                <div className="slogan">Every  <strong><ReactRotatingText items={['Module', 'App', 'Config']} /></strong> is just as weak as it's weakest dependency</div>
                <Menu icon borderless inverted color="white">
                    <Menu.Item name='twitter' href="https://twitter.com/Corp_JS" target='_blank'>
                        <Icon name={"twitter"} />
                    </Menu.Item>

                    <Menu.Item name='instagram' href="https://www.instagram.com/corpjs/" target='_blank'>
                        <Icon name={"instagram"} />
                    </Menu.Item>

                    <Menu.Item name='github' href="https://github.com/CorpJSBp" target='_blank'>
                        <Icon name={"github"} />
                    </Menu.Item>
                </Menu>
            </Container>
        </nav>
    </header>
);