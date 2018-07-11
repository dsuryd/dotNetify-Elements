import React from 'react';
import { Main, Header, Nav, NavMenu, NavMenuTarget, NavDrawerButton, Button, Frame, Panel, Section, VMContext } from 'dotnetify-elements';
import { withAuth, Logo } from './Login';
import auth from './auth';

const getVmOptions = _ => ({
   headers: { Authorization: 'Bearer ' + auth.getAccessToken() },
   exceptionHandler: _ => auth.signOut()
});

const logoutCss = `
   margin: 1rem; 
   width: calc(100% - 2rem);
`;

const App = _ => (
   <VMContext vm="App" options={getVmOptions()}>
      <Main>
         <Header>
            <Panel horizontal middle>
               <Logo />
               <NavDrawerButton />
            </Panel>
         </Header>
         <Nav>
            <Panel>
               <NavMenu id="NavMenu" />
               <Panel bottom>
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

export default withAuth(App);
