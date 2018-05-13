import React from 'react';
import styled from 'styled-components';
import { Checkbox, Frame, Markdown, MarkdownText, Panel, RadioToggle, Tab, TabItem, TextField, Theme, VMContext } from 'elements';
import Expander from '../../components/Expander';

const FormTextField = props => (
   <VMContext vm="FormTextField">
      <Theme>
         <Frame width="95%">
            <h3>TextField</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <TextFieldExample />
                  </Markdown>
               </TabItem>
               <TabItem label="Input Mask">
                  <Markdown id="Mask" />
               </TabItem>
               <TabItem label="API">
                  <Markdown id="API" />
               </TabItem>
            </Tab>
         </Frame>
      </Theme>
   </VMContext>
);

class TextFieldExample extends React.Component {
   state = { horizontal: false, plainText: false, disable: false };

   flags = [ { key: true, value: 'True' }, { key: false, value: 'False' } ];

   buildCode = props => {
      if (props.length > 0) props = props + ' ';
      let code = `
\`\`\`jsx
import React from 'react';
import { VMContext, TextField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="FormTextField">
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

      let propsText = Object.keys(this.state)
         .map(key => {
            let value = this.state[key];
            value = typeof value === 'boolean' ? (value ? '' : null) : `={${value}}`;
            return value !== null ? `${key}${value}` : null;
         })
         .filter(x => x)
         .join(' ');

      return (
         <Panel>
            <Panel css="min-height: 16rem">
               <TextField id="TextField_Name" horizontal={horizontal} plainText={plainText} disable={disable} />
               <TextField id="TextField_Phone" horizontal={horizontal} plainText={plainText} disable={disable} />
               <TextField id="TextField_Payment" horizontal={horizontal} plainText={plainText} disable={disable} />
            </Panel>
            <Panel horizontal>
               <RadioToggle id="_horizontal" label="Horizontal:" options={this.flags} value={horizontal} onChange={val => this.set('horizontal', val)} />
               <RadioToggle id="_plainText" label="Plain Text:" options={this.flags} value={plainText} onChange={val => this.set('plainText', val)} />
               <RadioToggle id="_disable" label="Disable:" options={this.flags} value={disable} onChange={val => this.set('disable', val)} />
            </Panel>
            <MarkdownText text={this.buildCode(propsText)} />
         </Panel>
      );
   }
}

export default FormTextField;
