import React from 'react';
import styled from 'styled-components';
import { Checkbox, Frame, Markdown, MarkdownText, Panel, RadioGroup, RadioToggle, Tab, TabItem, TextField, Theme, VMContext } from 'elements';
import * as utils from 'elements/utils';
import Expander from '../../components/Expander';

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

const withHighlight = Component => props => <Component style={{ border: '2px double red' }} {...props} />;

class TextFieldCustomize extends React.Component {
   constructor(props) {
      super(props);
      this.componentTypes = TextField.componentTypes;
      this.state = { selected: null, plainText: false };
   }

   buildCode = props => {
      if (props.length > 0) props = props + ' ';
      let code = `
\`\`\`jsx
<TextField id="MyTextField" ${props}/>
\`\`\``;
      return code;
   };

   customize(component, customize) {
      return customize ? withHighlight(component) : component;
   }

   setSelected = value => {
      this.setState({
         selected: value,
         plainText: value === 'PlainTextComponent',
         validationMessages: value === 'ValidationMessageComponent' ? [ 'Sample validation message' ] : null
      });
   };

   render() {
      const { selected, plainText, validationMessages } = this.state;
      const flags = [ { key: true, value: 'True' }, { key: false, value: 'False' } ];
      const options = Object.keys(this.componentTypes).map(key => ({ key: key, value: utils.toCamelCase(key) }));

      let componentProps = Object.keys(this.componentTypes).reduce((all, item) => ({ ...all, [item]: this.componentTypes[item] }), {});
      if (selected) componentProps[utils.toCamelCase(selected)] = withHighlight(componentProps[selected]);

      const propsText = selected ? `${utils.toCamelCase(selected)}=withHighlight(TextField.componentTypes.${selected})` : '';

      return (
         <VMContext vm="TextFieldCustomize">
            <Panel>
               <TextField
                  id="MyTextField"
                  placeholder="Type something and tab to see validation message"
                  prefix="http://www."
                  suffix="@acme.org"
                  plainText={plainText}
                  validationMessages={validationMessages}
                  {...componentProps}
               />
               <RadioGroup id="_components" label="Select sub-component to highlight:" options={options} value={selected} onChange={this.setSelected} />
               <MarkdownText text={this.buildCode(propsText)} />
            </Panel>
         </VMContext>
      );
   }
}

export default FormTextField;
