import React from 'react';
import Link from 'next/link';
import { Segment, Menu, Grid, Message, Container, List, Label, Header } from 'semantic-ui-react';
import Markdown from 'react-markdown';
import getPercentage from '../utils/getPercentage';
import { getQualificationColor } from '../utils/qualification';

export default class extends React.PureComponent {
  render() {
    const { pathname, inProgress, children, popularPackages = [], mdRules = '' } = this.props;
    return (
      <Container>
        <Grid columns={16}>
          <Grid.Row>
            <Grid.Column largeScreen={12} mobile={16}>
              <Segment>
                <Header as="h3" icon="pin" content="About Corp-Check" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla arcu sem, vitae pulvinar purus auctor nec. Suspendisse tempus ex sed nisi iaculis, sit amet pellentesque diam eleifend. Duis porttitor erat a risus molestie, nec lobortis enim vulputate. Nam tincidunt nunc ac velit tempus gravida sit amet quis dolor. Quisque quis condimentum lorem, at euismod ipsum. Nullam tristique dictum interdum. Praesent orci massa, rhoncus elementum fringilla id, sagittis sit amet est.
                </p>
              </Segment>
              <Segment loading={inProgress}>
                <Menu fluid widths={2}>
                  <Link prefetch href="/npm">
                    <Menu.Item name="name" active={pathname === '/npm'}>Enter package name</Menu.Item>
                  </Link>
                  <Link prefetch href="/json">
                    <Menu.Item name="json" active={pathname === '/json'}>Upload package.json</Menu.Item>
                  </Link>
                </Menu>
                {children}
              </Segment>
            </Grid.Column>
            <Grid.Column largeScreen={4} mobile={16}>
              <Segment size="small">
                <h3>Popular packages</h3>
                <List divided verticalAlign="middle">
                  {popularPackages.map(({ name, qualification, score, cid }) => (
                    <List.Item key={name} as="a" href={`/result?cid=${cid}`}>
                      <List.Content floated="left">
                        {name}
                      </List.Content>
                      <List.Content floated="right">
                        <Label circular color={getQualificationColor(qualification)} size="mini">
                          {getPercentage(score)}%
                        </Label>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column largeScreen={16} mobile={16}>
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
