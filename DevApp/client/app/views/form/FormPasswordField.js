import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Panel, PasswordField, Tab, TabItem, Theme, VMContext } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const FormPasswordField = props => (
   <VMContext vm="FormPasswordField">
      <Theme>
         <Frame width="95%">
            <h3>PasswordField</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <PasswordFieldExample />
                  </Markdown>
               </TabItem>
               <TabItem label="API">
                  <Markdown id="API" />
               </TabItem>
               <TabItem label="Customize">
                  <PasswordFieldCustomize />
               </TabItem>
            </Tab>
         </Frame>
      </Theme>
   </VMContext>
);

class PasswordFieldExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, PasswordField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="PasswordFieldExample">
      <PasswordField id="Password" ${props}/>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="PasswordFieldExample" propTypes={PasswordField.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel style={{ minHeight: '6rem' }}>
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
         <RenderCustomize vm="PasswordFieldCustomize" name="PasswordField" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
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

export default FormPasswordField;
