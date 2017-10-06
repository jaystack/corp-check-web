import React from 'react';
import { Grid, Container, Icon, Menu } from 'semantic-ui-react';
import ReactRotatingText from 'react-rotating-text';

export default () => (
    <header>
        <nav>
            <Container>
                <h2 id='logo'><a href='http://corpjs.com/'>CorpJS - Corp Check</a></h2>
                <div className='headerInner'>
                    <div className='slogan'>Every  <strong><ReactRotatingText items={['module', 'package', 'system', 'application', 'service']} /></strong> is just as weak as it's weakest dependency</div>
                    <Menu icon borderless inverted secondary color='white'>
                        <Menu.Item name='twitter' className='twitter' href='https://twitter.com/Corp_JS' target='_blank'>
                            <Icon name='twitter' />
                        </Menu.Item>
                        <Menu.Item name='instagram' className='instagram' href='https://www.instagram.com/corpjs/' target='_blank'>
                            <Icon name='instagram' />
                        </Menu.Item>
                        <Menu.Item name='github' className='github' href='https://github.com/CorpJSBp' target='_blank'>
                            <Icon name='github' />
                        </Menu.Item>
                    </Menu>
                </div>
            </Container>
        </nav>
    </header>
);