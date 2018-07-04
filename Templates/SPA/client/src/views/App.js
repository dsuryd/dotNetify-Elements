import React from 'react';
import { Main, Header, Footer, Nav, Section, NavDrawerButton, Panel, VMContext } from 'dotnetify-elements';
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
					<Nav />
					<Section />
					<Footer />
				</Main>
			</VMContext>
		);
	}
}

export default App;
