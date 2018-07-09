import React from 'react';
import styled from 'styled-components';
import { Main, Header, Nav, NavMenu, NavMenuTarget, NavDrawerButton, Panel, Section, VMContext } from 'dotnetify-elements';

const Logo = styled.div`
   display: flex;
   align-items: center;
   padding-left: 1rem;
   content: url(http://dotnetify.net/content/images/dotnetify-logo.png);
   width: 200px;
   height: 39px;
`;

class App extends React.Component {
   render() {
      return (
         <VMContext vm="App">
            <Main>
               <Header>
                  <Panel horizontal middle>
                     <Logo />
                     <NavDrawerButton />
                  </Panel>
               </Header>
               <Nav>
                  <NavMenu id="NavMenu" />
               </Nav>
               <Section>
                  <NavMenuTarget />
               </Section>
            </Main>
         </VMContext>
      );
   }
}

export default App;
