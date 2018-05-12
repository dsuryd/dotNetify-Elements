import React from 'react';
import styled from 'styled-components';
import { Frame, Main, Header, Footer, Nav, NavHeader, NavMenu, NavMenuTarget, Section, VMContext } from 'elements';
import DotNetifyLogo from '../components/DotNetifyLogo';

const App = props => (
   <VMContext vm="App">
      <Main>
         <Header>
            <NavHeader>
               <DotNetifyLogo />
            </NavHeader>
         </Header>
         <Nav>
            <NavMenu id="NavMenu" />
         </Nav>
         <Section>
            <NavMenuTarget />
         </Section>
         <Footer />
      </Main>
   </VMContext>
);

export default App;
