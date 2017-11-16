import React from 'react';
import Link from 'next/link';
import { Segment, Menu, Grid, Message, Container, Header, Tab } from 'semantic-ui-react';
import Markdown from 'react-markdown';
import PopularPackages from './PopularPackages';

export default class extends React.PureComponent {
  render() {
    const {
      pathname,
      inProgress,
      children,
      popularPackages = [],
      mdRules = '',
      mdCli = '',
      mdBadges = '',
      mdConcept = ''
    } = this.props;
    return (
      <Container>
        <Grid columns={16}>
          <Grid.Row>
            <Grid.Column largeScreen={11} widescreen={11} mobile={16}>
              <Segment>
                <Header as="h1" content="Corp-Check" />
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column largeScreen={16} mobile={16}>
                      <img
                        alt="screenshots"
                        src="/static/images/montage.png"
                        style={{ display: 'inline', float: 'right', margin: '1em', width: '350px' }}
                      />
                      <p className="justified">
                        Use Corp-Check to identify risks in packages you’d like to include into your precious code. Define
                        rule sets in your build process to prohibit dangerous packages jeopardizing your module and to get
                        warning messages about potentially risky includes.
                      </p>
                      <p className="justified">
                        Understand which included modules might cause trouble in the future, create an overall report about
                        your whole product.
                      </p>
                      <p className="justified">
                        Corp-Check will analyze included packages and dependencies for licensing, versioning and popularity
                        risks. A hidden GPLv2 license might destroy your business. An unreleased alpha version might change so
                        drastically in days that your whole product crashes. An abandoned package might cause serious support
                        troubles just weeks after releasing your software.
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
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
            <Grid.Column largeScreen={5} widescreen={5} mobile={16}>
              <Segment size="small">
                <h3>Popular packages</h3>
                <PopularPackages popularPackages={popularPackages} />
              </Segment>
              <Segment size="small">
                <h3>
                  <a href="https://www.npmjs.com/package/corp-check-cli" target="_blank">
                    Command Line Interface
                  </a>
                </h3>
                <pre className="cli">npm install corp-check-cli</pre>
                <p className="justified">
                  If you want to use Corp-Check for more than just as a web tool to check packages for risks, you can
                  integrate the CLI module into your build and deployment process to actually prohibit the deployment of
                  risky packages.
                </p>
                <p className="justified">
                  The CLI will use the ruleset you define and stop if it encounters a viral license, an unreleased
                  package or an abandoned package will tons of open issues.
                </p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column largeScreen={16} widescreen={16} mobile={16}>
              <Tab
                renderActiveOnly={false}
                panes={[
                  {
                    menuItem: { key: 'concept', content: <span className="tab-label">Concept</span>, icon: 'idea' },
                    pane: (
                      <Tab.Pane key="concept">
                        <Markdown source={mdConcept} className="md" />
                      </Tab.Pane>
                    )
                  },
                  {
                    menuItem: { key: 'rules', content: <span className="tab-label">Rules</span>, icon: 'sliders' },
                    pane: (
                      <Tab.Pane key="rules">
                        <Markdown source={mdRules} className="md" />
                      </Tab.Pane>
                    )
                  },
                  {
                    menuItem: { key: 'cli', content: <span className="tab-label">CLI</span>, icon: 'terminal' },
                    pane: (
                      <Tab.Pane key="cli">
                        <Markdown source={mdCli} className="md" />
                      </Tab.Pane>
                    )
                  },
                  {
                    menuItem: { key: 'badges', content: <span className="tab-label">Badges</span>, icon: 'tag' },
                    pane: (
                      <Tab.Pane key="badges">
                        <Markdown source={mdBadges} className="md" />
                      </Tab.Pane>
                    )
                  }
                ]}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
