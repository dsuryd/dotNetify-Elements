import React from 'react';
import { Button, Frame, Markdown, Panel, TabItem, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderExample } from '../../components';
import { Rectangle, Square } from './demo-helper';

const LayoutPanel = props => (
	<TabsArticle vm="LayoutPanel" id="Overview">
		<TabItem label="Overview" key="Overview">
			<Markdown id="Overview">
				<PanelExample />
				<FlexLayoutExample />
				<ChildPropsExample />
			</Markdown>
		</TabItem>
		<TabItem label="API" key="API">
			<Markdown id="API" />
		</TabItem>
	</TabsArticle>
);

class PanelExample extends React.Component {
	render() {
		const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Panel } from 'dotnetify-elements';
import { Square, Rectangle } from './demo-helper';

const MyApp = _ => (
   <Panel css="border: 2px dashed gray">
      <Panel css="border: 2px dashed red; height: 13rem"${props}>
         <Rectangle>1</Rectangle>
         <Square>2</Square>
         <Rectangle>3</Rectangle>
      </Panel>
   </Panel>   
);
\`\`\``;
		const setState = state => this.setState(state);
		const propTypes = {
			apart: null,
			bottom: null,
			center: null,
			horizontal: null,
			middle: null,
			noGap: null,
			noMargin: null,
			right: null,
			smallGap: null,
			smallMargin: null,
			wrap: null
		};
		return (
			<RenderExample propTypes={propTypes} defaultProps={Panel.defaultProps} buildCode={buildCode} onChange={setState}>
				<Panel height="16rem">
					<Panel css="border: 2px dashed #ccc">
						<Panel css="border: 2px dashed red; height: 13rem" {...this.state}>
							<Rectangle>1</Rectangle>
							<Square>2</Square>
							<Rectangle>3</Rectangle>
						</Panel>
					</Panel>
				</Panel>
			</RenderExample>
		);
	}
}

const FlexLayoutExample = props => (
	<Panel css="border: 2px dashed #ccc">
		<Frame>
			<Panel horizontal>
				<Panel horizontal flex css="border: 2px dashed red">
					<Square>1</Square>
					<Square>2</Square>
				</Panel>
				<Panel horizontal css="border: 2px dashed aquamarine">
					<Square>3</Square>
					<Square>4</Square>
				</Panel>
				<Panel css="border: 2px dashed green">
					<Rectangle>5</Rectangle>
					<Rectangle>6</Rectangle>
				</Panel>
			</Panel>
			<Panel horizontal>
				<Panel flex="20%" right css="border: 2px dashed blue">
					<Square>7</Square>
				</Panel>
				<Panel middle css="border: 2px dashed orange">
					<Square>8</Square>
					<Rectangle>9</Rectangle>
				</Panel>
				<Panel flex="30%" css="border: 2px dashed purple">
					<Square>10</Square>
				</Panel>
			</Panel>
		</Frame>
	</Panel>
);

class ChildPropsExample extends React.Component {
	state = {};

	render() {
		const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Panel, Button } from 'dotnetify-elements';

const MyApp = _ => (
   <Panel horizontal childProps={{ css: 'border: 2px dashed red', ${Object.keys(this.state)
		.map(key => `${key}: ${this.state[key]}`)
		.join(', ')}}}>
      <Panel>
         <Button label="Button 1" primary />
      </Panel>
      <Panel>
         <Button label="Button 2" secondary />
      </Panel>
   </Panel>
);
\`\`\``;
		const setState = state => this.setState(state);
		let propTypes = { middle: null, right: null };
		return (
			<RenderExample propTypes={propTypes} buildCode={buildCode} onChange={setState}>
				<Panel css="margin-bottom: 2rem">
					<Panel horizontal childProps={{ ...this.state, css: 'border: 2px dashed red' }}>
						<Panel>
							<Button label="Button 1" primary />
						</Panel>
						<Panel>
							<Button label="Button 2" secondary />
						</Panel>
					</Panel>
				</Panel>
			</RenderExample>
		);
	}
}

export default withTheme(LayoutPanel);
