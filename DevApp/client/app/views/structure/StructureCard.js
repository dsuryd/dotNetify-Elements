import React from 'react';
import styled from 'styled-components';
import { Button, Card, CardImage, Image, Markdown, Panel, TabItem, TextField, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureCard = props => (
	<TabsArticle vm="StructureCard" id="Overview">
		<TabItem label="Overview" key="Overview">
			<Markdown id="Overview">
				<CardExample />
				<CardImageExample />
			</Markdown>
		</TabItem>
		<TabItem label="API" key="API">
			<Markdown id="API" />
		</TabItem>
		<TabItem label="Customize">
			<CardCustomize />
		</TabItem>
	</TabsArticle>
);

class CardExample extends React.Component {
	render() {
		const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Button, Card, Markdown, Panel, TextField, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="CardExample">
      <Card>
         <header>
            <Markdown id="Title" />
         </header>
         <TextField horizontal id="Email" />
         <footer>
            <Panel right><Button id="Register" /></Panel>
         </footer>
      </Card>
   </VMContext>
);
\`\`\``;
		const setState = state => this.setState(state);
		return (
			<RenderExample vm="CardExample" propTypes={{}} buildCode={buildCode} onChange={setState}>
				<Panel css="margin-bottom: 2rem">
					<Card>
						<header>
							<Markdown id="Title" />
						</header>
						<TextField horizontal id="Email" />
						<footer>
							<Panel right>
								<Button id="Register" />
							</Panel>
						</footer>
					</Card>
				</Panel>
			</RenderExample>
		);
	}
}

const cardImageCss = `
   color: white; 
   background: #1c8adb; 
   text-align: center; 
   i { font-size: 4rem; padding: .6rem; }
`;

class CardImageExample extends React.Component {
	state = { horizontal: false };
	render() {
		const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Card, CardImage, Image, Markdown, VMContext } from 'dotnetify-elements';

const cardImageCss = \`
   color: white; 
   background: #1c8adb; 
   text-align: center; 
   i { font-size: 4rem; padding: .6rem; }
\`;

const MyApp = _ => (
   <VMContext vm="CardExample">
      <Panel>
         <Card>
            <CardImage css={cardImageCss}>
               <i className="material-icons">face</i>
            </CardImage>
            <h2>* 5000 Monthly Customers *</h2>
         </Card>         
         <Card${props != ' horizontal' ? ' width="360px"' : ''}${props}>
            <Markdown id="Content" />   
            <Image id="Picture" />
         </Card>         
      </Panel>
   </VMContext>
);
\`\`\``;
		const setState = state => this.setState(state);
		const propTypes = { horizontal: null };
		const props = !this.state.horizontal ? { width: '360px' } : null;
		return (
			<RenderExample vm="CardImageExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
				<Panel css="margin-bottom: 2rem" middle>
					<Card {...this.state}>
						<CardImage css={cardImageCss}>
							<i className="material-icons">face</i>
						</CardImage>
						<h3>* 5000 Monthly Customers *</h3>
					</Card>
					<Card {...props} {...this.state}>
						<Markdown id="Content" />
						<Image id="Picture" />
					</Card>
				</Panel>
			</RenderExample>
		);
	}
}

class CardCustomize extends React.Component {
	state = {};
	imageData = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22255%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20255%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_163d32075fc%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_163d32075fc%22%3E%3Crect%20width%3D%22255%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2294.2578125%22%20y%3D%2296%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

	render() {
		const componentTypes = Card.componentTypes;
		const handleSelected = state => this.setState(state);
		const select = value => ({});
		return (
			<RenderCustomize name="Card" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
				<Card width="255px">
					<img src={this.imageData} />
					<header>Header</header>
					<div>Body</div>
					<footer>Footer</footer>
				</Card>
			</RenderCustomize>
		);
	}
}

export default withTheme(StructureCard);
