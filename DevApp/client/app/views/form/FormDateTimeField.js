import React from 'react';
import styled from 'styled-components';
import { DateField, DateTimeField, TimeField, Frame, Markdown, Panel, Tab, TabItem, Theme, VMContext } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const FormDateTimeField = props => (
   <VMContext vm="FormDateTimeField">
      <Theme>
         <Frame width="95%">
            <h3>DateTimeField</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <DateTimeFieldExample />
                  </Markdown>
               </TabItem>
               <TabItem label="API">
                  <Markdown id="API" />
               </TabItem>
               <TabItem label="Customize">
                  <DateTimeFieldCustomize />
               </TabItem>
            </Tab>
         </Frame>
      </Theme>
   </VMContext>
);

class DateTimeFieldExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, DateTimeField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="DateTimeFieldExample">
      <DateTimeField id="DateTimeField_Example" ${props}/>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="DateTimeFieldExample" propTypes={DateTimeField.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel horizontal style={{ minHeight: '6rem' }}>
               <DateField id="Date" flex {...this.state} />
               <TimeField id="Time" flex {...this.state} />
               <DateTimeField id="DateTime" flex {...this.state} />
            </Panel>
         </RenderExample>
      );
   }
}

class DateTimeFieldCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText, validationMessages } = this.state;
      const componentTypes = DateTimeField.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent',
         validationMessages: value === 'ValidationMessageComponent' ? [ 'Validation message' ] : null
      });
      return (
         <RenderCustomize vm="DateTimeFieldCustomize" name="DateTimeField" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <DateTimeField id="MyDateTimeField" prefix="Prefix-" suffix="-Suffix" plainText={plainText} validationMessages={validationMessages} />
         </RenderCustomize>
      );
   }
}

export default FormDateTimeField;
