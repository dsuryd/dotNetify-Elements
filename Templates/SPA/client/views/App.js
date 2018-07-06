import React from 'react';
import { Main, Header, Nav, NavMenu, NavMenuTarget, NavDrawerButton, Panel, Section, VMContext } from 'dotnetify-elements';
import Logo from '../components/Logo';

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
