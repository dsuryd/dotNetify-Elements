import React from 'react';
import styled from 'styled-components';
import { Checkbox, Frame, Markdown, MarkdownText, Panel, RadioToggle, TextField, Theme, VMContext } from 'elements';
import Expander from '../../components/Expander';

const TextFieldDoc = props => (
   <VMContext vm="Docs">
      <Theme>
         <Frame margin="1rem 15% 1rem 1rem">
            <Markdown id="Form__TextField">
               <TextFieldDemo />
            </Markdown>
         </Frame>
      </Theme>
   </VMContext>
);

class TextFieldDemo extends React.Component {
   state = { horizontal: false, plainText: false, disable: false };

   flags = [ { key: true, value: 'True' }, { key: false, value: 'False' } ];

   buildCode = props => {
      let code = '```jsx\r\nimport { TextField } from \'elements\'\r\n...\r\n<TextField id="MyText" ' + props + ' />```';
      code += '\r\n```cs\r\nAddProperty("MyText")\r\n   .WithAttribute(this, new TextFieldAttribute { Label = "MyText", Placeholder = "Enter text"})```';
      return code;
   };

   set = (state, value) => {
      value = value === 'true' ? true : value === 'false' ? false : value;
      this.setState({ [state]: value });
   };

   render() {
      const { label, horizontal, plainText, disable } = this.state;

      const propsText = Object.keys(this.state)
         .map(key => {
            let value = this.state[key];
            value = typeof value === 'boolean' ? (value ? '' : null) : `={${value}}`;
            return value !== null ? `${key}${value}` : null;
         })
         .filter(x => x)
         .join(' ');

      return (
         <VMContext vm="SampleForm">
            <Panel>
               <div style={{ minHeight: '5rem' }}>
                  <TextField id="MyText" horizontal={horizontal} plainText={plainText} disable={disable} prefix="Sup" />
               </div>
               <MarkdownText text={this.buildCode(propsText)} />
               <Panel horizontal>
                  <RadioToggle id="_horizontal" label="Horizontal:" options={this.flags} value={horizontal} onChange={val => this.set('horizontal', val)} />
                  <RadioToggle id="_plainText" label="Plain Text:" options={this.flags} value={plainText} onChange={val => this.set('plainText', val)} />
                  <RadioToggle id="_disable" label="Disable:" options={this.flags} value={disable} onChange={val => this.set('disable', val)} />
               </Panel>
            </Panel>
         </VMContext>
      );
   }
}

export default TextFieldDoc;
