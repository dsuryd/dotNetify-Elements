import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Panel, PasswordField, Tab, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormPasswordField = props => (
	<TabsArticle vm="FormPasswordField" id="Overview">
		<TabItem label="Overview" key="Overview">
			<Markdown id="Overview">
				<PasswordFieldExample />
			</Markdown>
		</TabItem>
		<TabItem label="API" key="API">
			<Markdown id="API" />
		</TabItem>
		<TabItem label="Customize">
			<PasswordFieldCustomize />
		</TabItem>
	</TabsArticle>
);

class PasswordFieldExample extends React.Component {
	render() {
		const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, PasswordField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="PasswordFieldExample">
      <PasswordField id="Password"${props} />
   </VMContext>
);
\`\`\``;
		const setState = state => this.setState(state);
		const propTypes = { enable: null, horizontal: null, plainText: null };
		return (
			<RenderExample vm="PasswordFieldExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
				<Panel style={{ minHeight: '7rem' }}>
					<PasswordField id="Password" {...this.state} />
				</Panel>
			</RenderExample>
		);
	}
}

class PasswordFieldCustomize extends React.Component {
	state = { plainText: false, validationMessages: null };

	render() {
		const { plainText, validationMessages } = this.state;
		const componentTypes = PasswordField.componentTypes;
		const handleSelected = state => this.setState(state);
		const select = value => ({
			plainText: value === 'PlainTextComponent',
			validationMessages: value === 'ValidationMessageComponent' ? [ 'Validation message' ] : null
		});
		return (
			<RenderCustomize
				vm="PasswordFieldCustomize"
				name="PasswordField"
				componentTypes={componentTypes}
				select={select}
				onSelected={handleSelected}
			>
				<PasswordField
					id="MyPasswordField"
					label="Label:"
					prefix="Prefix-"
					suffix="-Suffix"
					plainText={plainText}
					validationMessages={validationMessages}
				/>
			</RenderCustomize>
		);
	}
}

export default withTheme(FormPasswordField);
