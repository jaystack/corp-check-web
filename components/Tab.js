import { Segment, Menu, Grid, Message, Container } from 'semantic-ui-react';
import Link from 'next/link';

export default ({ pathname, inProgress, children }) => (
  <Container>
    <Grid columns={16}>
      <Grid.Column largeScreen={12} mobile={16}>
        <Message size="massive" icon="idea" content="Every module is just as weak as it's weakest dependency" />
        <Segment loading={inProgress}>
          <Menu fluid widths={2}>
            <Link prefetch href="/npm">
              <Menu.Item name="name" active={pathname === '/npm'}>NPM</Menu.Item>
            </Link>
            <Link prefetch href="/json">
              <Menu.Item name="json" active={pathname === '/json'}>Your package.json</Menu.Item>
            </Link>
          </Menu>
          {children}
        </Segment>
      </Grid.Column>
    </Grid>
  </Container>
);
