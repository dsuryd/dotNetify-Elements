import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Panel, Tab, TabItem, RadioGroup, Theme, VMContext } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const FormRadioGroup = props => (
   <VMContext vm="FormRadioGroup">
      <Theme>
         <Frame width="95%">
            <h3>RadioGroup</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <RadioGroupExample />
                  </Markdown>
               </TabItem>
               <TabItem label="API">
                  <Markdown id="API" />
               </TabItem>
               <TabItem label="Customize">
                  <RadioGroupCustomize />
               </TabItem>
            </Tab>
         </Frame>
      </Theme>
   </VMContext>
);

class RadioGroupExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, RadioGroup } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="RadioGroupExample">
      <RadioGroup id="Weather" ${props}/>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="RadioGroupExample" propTypes={RadioGroup.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel style={{ minHeight: '9rem' }}>
               <RadioGroup id="Weather" {...this.state} />
            </Panel>
         </RenderExample>
      );
   }
}

class RadioGroupCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText } = this.state;
      const componentTypes = RadioGroup.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent'
      });
      return (
         <RenderCustomize vm="RadioGroupCustomize" name="RadioGroup" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <RadioGroup id="MyRadioGroup" label="Label:" plainText={plainText} />
         </RenderCustomize>
      );
   }
}

export default FormRadioGroup;
