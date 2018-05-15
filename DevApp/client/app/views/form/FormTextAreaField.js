import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, MarkdownText, Panel, RadioToggle, Tab, TabItem, TextAreaField, Theme, VMContext } from 'elements';
import FieldCustomize, { formatPropsForDisplay } from '../../components/FieldCustomize';

const FormTextAreaField = props => (
   <VMContext vm="FormTextAreaField">
      <Theme>
         <Frame width="95%">
            <h3>TextAreaField</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <TextAreaFieldExamples />
                  </Markdown>
               </TabItem>
               <TabItem label="API">
                  <Markdown id="API" />
               </TabItem>
               <TabItem label="Customize">
                  <TextAreaFieldCustomize />
               </TabItem>
            </Tab>
         </Frame>
      </Theme>
   </VMContext>
);

class TextAreaFieldExamples extends React.Component {
   state = { horizontal: false, plainText: false, disable: false };

   buildCode = props => {
      if (props.length > 0) props = props + ' ';
      return `
\`\`\`jsx
import React from 'react';
import { VMContext, TextAreaField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="TextAreaFieldExamples">
      <TextAreaField id="TextAreaField_Comment" ${props}/>
   </VMContext>
);
\`\`\``;
   };

   render() {
      const { label, horizontal, plainText, disable } = this.state;
      const flags = [ { key: true, value: 'True' }, { key: false, value: 'False' } ];
      const set = (state, value) => this.setState({ [state]: value === 'true' ? true : value === 'false' ? false : value });
      return (
         <VMContext vm="TextAreaFieldExamples">
            <Panel>
               <Panel css="min-height: 10rem">
                  <TextAreaField id="TextAreaField_Comment" horizontal={horizontal} plainText={plainText} disable={disable} />
               </Panel>
               <Panel horizontal>
                  <RadioToggle id="_horizontal" label="Horizontal:" options={flags} value={horizontal} onChange={val => set('horizontal', val)} />
                  <RadioToggle id="_plainText" label="Plain Text:" options={flags} value={plainText} onChange={val => set('plainText', val)} />
                  <RadioToggle id="_disable" label="Disable:" options={flags} value={disable} onChange={val => set('disable', val)} />
               </Panel>
               <MarkdownText text={this.buildCode(formatPropsForDisplay(this.state))} />
            </Panel>
         </VMContext>
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
         <FieldCustomize vm="TextAreaFieldCustomize" name="TextAreaField" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <TextAreaField id="MyField" prefix="Prefix-" suffix="-Suffix" plainText={plainText} validationMessages={validationMessages} />
         </FieldCustomize>
      );
   }
}

export default FormTextAreaField;
