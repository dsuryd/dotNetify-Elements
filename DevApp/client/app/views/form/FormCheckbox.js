import React from 'react';
import styled from 'styled-components';
import { Checkbox, Frame, Markdown, Panel, Tab, TabItem, Theme, VMContext } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const FormCheckbox = props => (
   <VMContext vm="FormCheckbox">
      <Theme>
         <Frame width="95%">
            <h3>Checkbox</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <CheckboxExample />
                  </Markdown>
               </TabItem>
               <TabItem label="API">
                  <Markdown id="API" />
               </TabItem>
               <TabItem label="Customize">
                  <CheckboxCustomize />
               </TabItem>
            </Tab>
         </Frame>
      </Theme>
   </VMContext>
);

class CheckboxExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, Checkbox } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="CheckboxExample">
      <Checkbox id="Agree" />
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="CheckboxExample" propTypes={Checkbox.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel style={{ minHeight: '3rem' }}>
               <Checkbox id="Agree" {...this.state} />
            </Panel>
         </RenderExample>
      );
   }
}

class CheckboxCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText } = this.state;
      const componentTypes = Checkbox.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent'
      });
      return (
         <RenderCustomize vm="CheckboxCustomize" name="Checkbox" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Checkbox id="MyCheckbox" plainText={plainText} />
         </RenderCustomize>
      );
   }
}

export default FormCheckbox;
