import React from 'react';
import { VMContext } from 'dotnetify-elements/components';
import { Button } from 'dotnetify-elements/components/Button';
import { Panel } from 'dotnetify-elements/components/Panel';
import { Main, Header, Nav, Section } from 'dotnetify-elements/components/LayoutGrid';
import { NavMenu, NavMenuTarget, NavDrawerButton } from 'dotnetify-elements/components/NavMenu';
import { Logo, Login } from './Login';
import { auth, getAuthHeaders } from './auth';

const App = _ => (
  <VMContext vm="App" options={getAuthHeaders()}>
    <Main>
      <Header>
        <NavDrawerButton show css="margin-left: 1rem" />
        <Logo />
      </Header>
      <Nav>
        <Panel>
          <NavMenu id="NavMenu" />
          <Panel flex bottom padding="1rem">
            <Button stretch label="Logout" onClick={_ => auth.signOut()} />
          </Panel>
        </Panel>
      </Nav>
      <Section>
        <NavMenuTarget />
      </Section>
    </Main>
  </VMContext>
);

export default class extends React.Component {
  state = { authenticated: auth.hasAccessToken() };
  handleAuthenticated = _ => this.setState({ authenticated: true });
  render() {
    return !this.state.authenticated ? <Login onAuthenticated={this.handleAuthenticated} /> : <App />;
  }
}
