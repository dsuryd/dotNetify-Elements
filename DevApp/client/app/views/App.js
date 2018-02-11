import React from 'react';
import styled from 'styled-components';
import { Main, Header, Footer, Nav, NavHeader, NavMenu, NavMenuTarget, Section, VMContext } from '../../elements-bootstrap';

const App = props => (
  <VMContext vm="App">
    <Main>
      <Header>
        <NavHeader>dotNetify</NavHeader>
      </Header>
      <Nav>
        <NavMenu id="NavMenu" />
      </Nav>
      <Section>
        <NavMenuTarget />
      </Section>
      <Footer>
      </Footer>
    </Main>
  </VMContext>
);

export default App;