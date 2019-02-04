import React from 'react';
import { Main, Header, Footer, Nav, NavDrawerButton, NavMenu, NavMenuTarget, Panel, Section, VMContext } from 'dotnetify-elements';
import DotNetifyLogo, { GitHubLink, TwitterLink, ThemeToggle, LicenseNotice } from '../components/DotNetifyLogo';
import MenuLinks from '../components/MenuLinks';
import lightTheme from 'dotnetify-elements/theme-light';
import darkTheme from 'dotnetify-elements/theme-dark';
import { themeToggleEvent } from './layout/demo-helper';

const navCss = `
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 20px;
  }
  ::-webkit-scrollbar-track {
    background: #eee;
    border-radius: 20px;
  }
`;

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = { theme: lightTheme };

      themeToggleEvent.subscribe(arg => {
         this.setState({ theme: arg || this.state.theme.name === 'light' ? darkTheme : lightTheme });
      });
   }

   render() {
      const { theme } = this.state;
      return (
         <VMContext vm="ElementsApp">
            <Main theme={theme}>
               <Header>
                  <NavDrawerButton show css="margin-left: 1rem" />
                  <DotNetifyLogo />
                  <MenuLinks active="elements" />
                  <Panel horizontal center middle right padding="1rem">
                     <ThemeToggle name={theme.name} onClick={_ => themeToggleEvent.emit()} />
                     <TwitterLink />
                  </Panel>
               </Header>
               <Nav css={navCss}>
                  <Panel noGap>
                     <MenuLinks nav={true} active="elements" />
                     <GitHubLink />
                     <NavMenu id="NavMenu" />
                  </Panel>
               </Nav>
               <Section>
                  <NavMenuTarget />
               </Section>
               <Footer>
                  <LicenseNotice>
                     © 2015-2019 Dicky Suryadi. Licensed under the <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache license version 2.0</a>
                  </LicenseNotice>
               </Footer>
            </Main>
         </VMContext>
      );
   }
}

export default App;
