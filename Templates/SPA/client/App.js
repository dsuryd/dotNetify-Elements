import React from 'react';
import { Main, Header, Nav, NavMenu, NavMenuTarget, NavDrawerButton, Panel, Section, VMContext } from 'dotnetify-elements';
import { withAuth, Logo } from './Login';
import auth from './auth';

const getVmOptions = _ => ({
	headers: { Authorization: 'Bearer ' + auth.getAccessToken() },
	exceptionHandler: _ => auth.signOut()
});

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
				<NavMenu flex id="NavMenu" />
			</Nav>
			<Section>
				<NavMenuTarget />
			</Section>
		</Main>
	</VMContext>
);

export default withAuth(App);
