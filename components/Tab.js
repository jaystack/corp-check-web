import React from 'react';
import Link from 'next/link';
import { Segment, Menu, Grid, Message, Container, Header } from 'semantic-ui-react';
import Markdown from 'react-markdown';
import PopularPackages from './PopularPackages';

export default class extends React.PureComponent {
  render() {
    const { pathname, inProgress, children, popularPackages = [], mdRules = '' } = this.props;
    return (
      <Container>
        <Grid columns={16}>
          <Grid.Row>
            <Grid.Column largeScreen={12} widescreen={12} mobile={16}>
              <Segment>
                <Header as="h3" icon="pin" content="About Corp-Check" />
                <p>
                  Use CorpCheck to identify risks in packages you’d like to include into your precious code. Define rule
                  sets in your build process to prohibit dangerous packages jeopardizing your module and to get warning
                  messages about potentially risky includes.
                </p>
                <p>
                  Understand which included modules might cause trouble in the future, create an overall report about
                  your whole product.
                </p>
                <p>
                  CorpCheck will analyze included packages and dependencies for licensing, versioning and popularity
                  risks. A hidden GPLv2 license might destroy your business. An unreleased alpha version might change so
                  drastically in days that your whole product crashes. An abandoned package might cause serious support
                  troubles just weeks after releasing your software.
                </p>
              </Segment>
              <Segment loading={inProgress}>
                <Menu fluid widths={2}>
                  <Link prefetch href="/npm">
                    <Menu.Item name="name" active={pathname === '/npm'}>
                      Enter package name
                    </Menu.Item>
                  </Link>
                  <Link prefetch href="/json">
                    <Menu.Item name="json" active={pathname === '/json'}>
                      Upload package.json
                    </Menu.Item>
                  </Link>
                </Menu>
                {children}
              </Segment>
            </Grid.Column>
            <Grid.Column largeScreen={4} widescreen={4} mobile={16}>
              <Segment size="small">
                <h3>Popular packages</h3>
                <PopularPackages popularPackages={popularPackages} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column largeScreen={16} widescreen={16} mobile={16}>
              <Segment>
                <Markdown source={mdRules} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
