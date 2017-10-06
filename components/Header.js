import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import ReactRotatingText from 'react-rotating-text';


export default () => (
    <header>
        <nav>
            <Container>
                <h2 id="logo"><a href="http://corpjs.com/">CorpJS - Corp Check</a></h2>
                <ReactRotatingText items={['first', 'second', 'third']} />
                {/*<!--ul>
                <li></li>
                </ul-->*/}
            </Container>
        </nav>
    </header>
);