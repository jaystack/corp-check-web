import { Segment, Menu, Grid } from 'semantic-ui-react';
import Link from 'next/link';

export default ({ pathname, inProgress, children }) => (
  <Grid centered columns={2}>
    <Grid.Column>
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
);
