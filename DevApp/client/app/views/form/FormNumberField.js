import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, NumberField, Panel, Tab, TabItem, VMContext, withTheme } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const FormNumberField = props => (
   <VMContext vm="FormNumberField">
      <Frame width="95%">
         <h3>NumberField</h3>
         <Tab>
            <TabItem label="Overview">
               <Markdown id="Overview">
                  <NumberFieldExample />
               </Markdown>
            </TabItem>
            <TabItem label="API">
               <Markdown id="API" />
            </TabItem>
            <TabItem label="Customize">
               <NumberFieldCustomize />
            </TabItem>
         </Tab>
      </Frame>
   </VMContext>
);

class NumberFieldExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, Panel, NumberField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="NumberFieldExample">
      <Panel horizontal childProps={{style: {minWidth: '14rem', maxWidth: '20rem', whiteSpace: 'nowrap'}}>   
         <NumberField id="HeightFeet" ${props}/>
         <NumberField id="HeightInches" ${props}/>
      </Panel>      
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      const style = { minWidth: '14rem', maxWidth: '20rem', whiteSpace: 'nowrap' };
      return (
         <RenderExample vm="NumberFieldExample" propTypes={NumberField.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel horizontal style={{ minHeight: '7rem' }} childProps={{ style: style }}>
               <NumberField id="HeightFeet" {...this.state} />
               <NumberField id="HeightInches" {...this.state} />
            </Panel>
         </RenderExample>
      );
   }
}

class NumberFieldCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText, validationMessages } = this.state;
      const componentTypes = NumberField.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent',
         validationMessages: value === 'ValidationMessageComponent' ? [ 'Validation message' ] : null
      });
      return (
         <RenderCustomize vm="NumberFieldCustomize" name="NumberField" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <NumberField id="MyNumberField" prefix="Prefix-" suffix="-Suffix" plainText={plainText} validationMessages={validationMessages} />
         </RenderCustomize>
      );
   }
}

export default withTheme(FormNumberField);
