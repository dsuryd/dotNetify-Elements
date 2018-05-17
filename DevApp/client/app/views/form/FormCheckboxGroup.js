import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Panel, Tab, TabItem, Theme, VMContext } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const FormCheckboxGroup = props => (
   <VMContext vm="FormCheckboxGroup">
      <Theme>
         <Frame width="95%">
            <h3>CheckboxGroup</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <CheckboxGroupExample />
                  </Markdown>
               </TabItem>
               <TabItem label="API">
                  <Markdown id="API" />
               </TabItem>
               <TabItem label="Customize">
                  <CheckboxGroupCustomize />
               </TabItem>
            </Tab>
         </Frame>
      </Theme>
   </VMContext>
);

class CheckboxGroupExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, CheckboxGroup } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="CheckboxGroupExample">
      <CheckboxGroup id="CheckboxGroup_Example" ${props}/>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="CheckboxGroupExample" propTypes={CheckboxGroup.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel style={{ minHeight: '8rem' }}>
               <CheckboxGroup id="CheckboxGroup_Example" {...this.state} />
            </Panel>
         </RenderExample>
      );
   }
}

class CheckboxGroupCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText } = this.state;
      const componentTypes = CheckboxGroup.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent'
      });
      return (
         <RenderCustomize vm="CheckboxGroupCustomize" name="CheckboxGroup" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <CheckboxGroup id="MyCheckboxGroup" label="Label:" plainText={plainText} />
         </RenderCustomize>
      );
   }
}

export default FormCheckboxGroup;
