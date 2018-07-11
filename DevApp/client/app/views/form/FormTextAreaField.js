import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Panel, Tab, TabItem, TextAreaField, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormTextAreaField = props => (
	<TabsArticle vm="FormTextAreaField" id="Overview">
		<TabItem label="Overview" key="Overview">
			<Markdown id="Overview">
				<TextAreaFieldExample />
			</Markdown>
		</TabItem>
		<TabItem label="API" key="API">
			<Markdown id="API" />
		</TabItem>
		<TabItem label="Customize">
			<TextAreaFieldCustomize />
		</TabItem>
	</TabsArticle>
);

class TextAreaFieldExample extends React.Component {
	render() {
		const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, TextAreaField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="TextAreaFieldExample">
      <TextAreaField id="Comment"${props} />
   </VMContext>
);
\`\`\``;
		const setState = state => this.setState(state);
		const propTypes = { enable: null, horizontal: null, plainText: null };
		return (
			<RenderExample vm="TextAreaFieldExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
				<Panel style={{ minHeight: '11rem' }}>
					<TextAreaField id="Comment" {...this.state} />
				</Panel>
			</RenderExample>
		);
	}
}

class TextAreaFieldCustomize extends React.Component {
	state = { plainText: false, validationMessages: null };

	render() {
		const { plainText, validationMessages } = this.state;
		const componentTypes = TextAreaField.componentTypes;
		const handleSelected = state => this.setState(state);
		const select = value => ({
			plainText: value === 'PlainTextComponent',
			validationMessages: value === 'ValidationMessageComponent' ? [ 'Validation message' ] : null
		});
		return (
			<RenderCustomize
				vm="TextAreaFieldCustomize"
				name="TextAreaField"
				componentTypes={componentTypes}
				select={select}
				onSelected={handleSelected}
			>
				<TextAreaField
					id="MyField"
					prefix="Prefix-"
					suffix="-Suffix"
					plainText={plainText}
					validationMessages={validationMessages}
				/>
			</RenderCustomize>
		);
	}
}

export default withTheme(FormTextAreaField);
