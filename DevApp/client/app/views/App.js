import React from 'react';
import styled from 'styled-components';
import { Frame, Main, Header, Footer, Nav, NavHeader, NavMenu, NavMenuTarget, Panel, Section, VMContext } from 'dotnetify-elements';
import DotNetifyLogo, { LicenseNotice } from '../components/DotNetifyLogo';

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
         <Footer>
            <LicenseNotice>
               © 2015-2018 Dicky Suryadi. Licensed under the <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache license version 2.0</a>
            </LicenseNotice>
         </Footer>
      </Main>
   </VMContext>
);

export default App;
