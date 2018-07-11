import React from 'react';
import { Main, Header, Footer, Nav, NavDrawerButton, NavMenu, NavMenuTarget, Panel, Section, VMContext } from 'dotnetify-elements';
import DotNetifyLogo, { GitHubLink, ThemeToggle, LicenseNotice } from '../components/DotNetifyLogo';
import lightTheme from 'dotnetify-elements/theme-light';
import darkTheme from 'dotnetify-elements/theme-dark';
import { themeToggleEvent } from './layout/demo-helper';

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
			<VMContext vm="App">
				<Main theme={theme}>
					<Header>
						<NavDrawerButton show css="margin-left: 1rem" />
						<DotNetifyLogo />
						<Panel center middle right padding="1rem">
							<ThemeToggle name={theme.name} onClick={_ => themeToggleEvent.emit()} />
							<GitHubLink />
						</Panel>
					</Header>
					<Nav>
						<NavMenu id="NavMenu" />
					</Nav>
					<Section>
						<NavMenuTarget />
					</Section>
					<Footer>
						<LicenseNotice>
							© 2015-2018 Dicky Suryadi. Licensed under the{' '}
							<a href="http://www.apache.org/licenses/LICENSE-2.0">Apache license version 2.0</a>
						</LicenseNotice>
					</Footer>
				</Main>
			</VMContext>
		);
	}
}

export default App;
