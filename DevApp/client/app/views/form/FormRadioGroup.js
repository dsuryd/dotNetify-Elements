import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Panel, Tab, TabItem, RadioGroup, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormRadioGroup = props => (
	<TabsArticle vm="FormRadioGroup" id="Overview">
		<TabItem label="Overview" key="Overview">
			<Markdown id="Overview">
				<RadioGroupExample />
			</Markdown>
		</TabItem>
		<TabItem label="API" key="API">
			<Markdown id="API" />
		</TabItem>
		<TabItem label="Customize">
			<RadioGroupCustomize />
		</TabItem>
	</TabsArticle>
);

class RadioGroupExample extends React.Component {
	render() {
		const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, RadioGroup } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="RadioGroupExample">
      <RadioGroup id="Weather"${props} />
   </VMContext>
);
\`\`\``;
		const setState = state => this.setState(state);
		const propTypes = { enable: null, horizontal: null, plainText: null };
		return (
			<RenderExample vm="RadioGroupExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
				<Panel style={{ minHeight: '10rem' }}>
					<RadioGroup id="Weather" {...this.state} />
				</Panel>
			</RenderExample>
		);
	}
}

class RadioGroupCustomize extends React.Component {
	state = { plainText: false, validationMessages: null };

	render() {
		const { plainText } = this.state;
		const componentTypes = RadioGroup.componentTypes;
		const handleSelected = state => this.setState(state);
		const select = value => ({
			plainText: value === 'PlainTextComponent'
		});
		return (
			<RenderCustomize
				vm="RadioGroupCustomize"
				name="RadioGroup"
				componentTypes={componentTypes}
				select={select}
				onSelected={handleSelected}
			>
				<RadioGroup id="MyRadioGroup" label="Label:" plainText={plainText} />
			</RenderCustomize>
		);
	}
}

export default withTheme(FormRadioGroup);
