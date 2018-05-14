import React from 'react';
import styled from 'styled-components';
import { Checkbox, Frame, Markdown, MarkdownText, Panel, RadioToggle, Tab, TabItem, TextField, Theme, VMContext } from 'elements';
import FieldCustomize from '../../components/FieldCustomize';

const FormTextField = props => (
   <VMContext vm="FormTextField">
      <Theme>
         <Frame width="95%">
            <h3>TextField</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <TextFieldExamples />
                  </Markdown>
               </TabItem>
               <TabItem label="Input Mask">
                  <Markdown id="Mask" />
               </TabItem>
               <TabItem label="API">
                  <Markdown id="API" />
               </TabItem>
               <TabItem label="Customize">
                  <TextFieldCustomize />
               </TabItem>
            </Tab>
         </Frame>
      </Theme>
   </VMContext>
);

class TextFieldExamples extends React.Component {
   state = { horizontal: false, plainText: false, disable: false };

   buildCode = props => {
      if (props.length > 0) props = props + ' ';
      let code = `
\`\`\`jsx
import React from 'react';
import { VMContext, TextField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="TextFieldExamples">
      <TextField id="TextField_Name" ${props}/>
      <TextField id="TextField_Phone" ${props}/>
      <TextField id="TextField_Payment" ${props}/>
   </VMContext>
);
\`\`\``;
      return code;
   };

   set = (state, value) => {
      value = value === 'true' ? true : value === 'false' ? false : value;
      this.setState({ [state]: value });
   };

   render() {
      const { label, horizontal, plainText, disable } = this.state;
      const flags = [ { key: true, value: 'True' }, { key: false, value: 'False' } ];

      let propsText = Object.keys(this.state)
         .map(key => {
            let value = this.state[key];
            value = typeof value === 'boolean' ? (value ? '' : null) : `={${value}}`;
            return value !== null ? `${key}${value}` : null;
         })
         .filter(x => x)
         .join(' ');

      return (
         <VMContext vm="TextFieldExamples">
            <Panel>
               <Panel css="min-height: 16rem">
                  <TextField id="TextField_Name" horizontal={horizontal} plainText={plainText} disable={disable} />
                  <TextField id="TextField_Phone" horizontal={horizontal} plainText={plainText} disable={disable} />
                  <TextField id="TextField_Payment" horizontal={horizontal} plainText={plainText} disable={disable} />
               </Panel>
               <Panel horizontal>
                  <RadioToggle id="_horizontal" label="Horizontal:" options={flags} value={horizontal} onChange={val => this.set('horizontal', val)} />
                  <RadioToggle id="_plainText" label="Plain Text:" options={flags} value={plainText} onChange={val => this.set('plainText', val)} />
                  <RadioToggle id="_disable" label="Disable:" options={flags} value={disable} onChange={val => this.set('disable', val)} />
               </Panel>
               <MarkdownText text={this.buildCode(propsText)} />
            </Panel>
         </VMContext>
      );
   }
}

class TextFieldCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   setSelected = value => {
      return {
         plainText: value === 'PlainTextComponent',
         validationMessages: value === 'ValidationMessageComponent' ? [ 'Validation message' ] : null
      };
   };

   render() {
      const { plainText, validationMessages } = this.state;
      const handleSelected = state => this.setState(state);

      return (
         <FieldCustomize
            vm="TextFieldCustomize"
            name="TextField"
            componentTypes={TextField.componentTypes}
            setSelected={this.setSelected}
            onSelected={handleSelected}
         >
            <TextField
               id="MyTextField"
               placeholder="Placeholder"
               prefix="Prefix-"
               suffix="-Suffix"
               plainText={plainText}
               validationMessages={validationMessages}
            />
         </FieldCustomize>
      );
   }
}

export default FormTextField;
