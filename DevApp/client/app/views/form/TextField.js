import React from 'react';
import styled from 'styled-components';
import { Checkbox, Frame, Markdown, Panel, RadioToggle, TextField, Theme, VMContext } from 'elements';

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

const flags = [ { key: true, value: 'True' }, { key: false, value: 'False' } ];

class TextFieldDemo extends React.Component {
   state = { horizontal: false, plainText: false, disable: false };

   set = (state, value) => this.setState({ [state]: value === 'true' ? true : false });

   render() {
      const { horizontal, plainText, disable } = this.state;
      return (
         <VMContext vm="SampleForm">
            <Panel>
               <TextField id="MyText" horizontal={horizontal} plainText={plainText} disable={disable} />
               <Panel childProps={{ horizontal: true }}>
                  <RadioToggle id="_horizontal" label="Horizontal:" options={flags} value={horizontal} onChange={val => this.set('horizontal', val)} />
                  <RadioToggle id="_plainText" label="Plain Text:" options={flags} value={plainText} onChange={val => this.set('plainText', val)} />
                  <RadioToggle id="_disable" label="Disable:" options={flags} value={disable} onChange={val => this.set('disable', val)} />
               </Panel>
            </Panel>
         </VMContext>
      );
   }
}

export default TextFieldDoc;
