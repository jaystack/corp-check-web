import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import ReactRotatingText from 'react-rotating-text';

export default () => (
    <header>
        <nav>
            <Container>
                <h2 id="logo"><a href="http://corpjs.com/">CorpJS - Corp Check</a></h2>
                <div className="slogan">Every  <strong><ReactRotatingText items={['Module', 'App', 'Config']} /></strong> is just as weak as it's weakest dependency</div>
                {/*<!--ul>
                <li></li>
                </ul-->*/}
            </Container>
        </nav>
    </header>
);