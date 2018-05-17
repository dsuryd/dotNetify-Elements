import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Panel, Tab, TabItem, RadioToggle, Theme, VMContext } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const FormRadioToggle = props => (
   <VMContext vm="FormRadioToggle">
      <Theme>
         <Frame width="95%">
            <h3>RadioToggle</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <RadioToggleExample />
                  </Markdown>
               </TabItem>
               <TabItem label="API">
                  <Markdown id="API" />
               </TabItem>
               <TabItem label="Customize">
                  <RadioToggleCustomize />
               </TabItem>
            </Tab>
         </Frame>
      </Theme>
   </VMContext>
);

class RadioToggleExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, RadioToggle } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="RadioToggleExample">
      <RadioToggle id="Position" ${props}/>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="RadioToggleExample" propTypes={RadioToggle.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel style={{ minHeight: '6rem' }}>
               <RadioToggle id="Position" {...this.state} />
            </Panel>
         </RenderExample>
      );
   }
}

class RadioToggleCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText } = this.state;
      const componentTypes = RadioToggle.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent'
      });
      return (
         <RenderCustomize vm="RadioToggleCustomize" name="RadioToggle" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <RadioToggle id="MyRadioToggle" label="Label:" plainText={plainText} />
         </RenderCustomize>
      );
   }
}

export default FormRadioToggle;
