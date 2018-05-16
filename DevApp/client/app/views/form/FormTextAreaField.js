import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Panel, Tab, TabItem, TextAreaField, Theme, VMContext } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const FormTextAreaField = props => (
   <VMContext vm="FormTextAreaField">
      <Theme>
         <Frame width="95%">
            <h3>TextAreaField</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <TextAreaFieldExample />
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

class TextAreaFieldExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, TextAreaField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="TextAreaFieldExample">
      <TextAreaField id="TextAreaField_Comment" ${props}/>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="TextAreaFieldExample" propTypes={TextAreaField.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="min-height: 10rem">
               <TextAreaField id="TextAreaField_Comment" {...this.state} />
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
         <RenderCustomize vm="TextAreaFieldCustomize" name="TextAreaField" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <TextAreaField id="MyField" label="Label:" prefix="Prefix-" suffix="-Suffix" plainText={plainText} validationMessages={validationMessages} />
         </RenderCustomize>
      );
   }
}

export default FormTextAreaField;
