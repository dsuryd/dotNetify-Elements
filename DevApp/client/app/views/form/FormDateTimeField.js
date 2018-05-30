import React from 'react';
import styled from 'styled-components';
import { DateField, DateTimeField, TimeField, Frame, Markdown, Panel, Tab, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormDateTimeField = props => (
   <TabsArticle vm="FormDateTimeField" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <DateTimeFieldExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <DateTimeFieldCustomize />
      </TabItem>
   </TabsArticle>
);

class DateTimeFieldExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, DateTimeField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="DateTimeFieldExample">
      <Panel horizontal>
         <DateField id="Date" ${props}flex />
         <TimeField id="Time" ${props}flex />
         <DateTimeField id="DateTime" ${props}flex />
      </Panel>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="DateTimeFieldExample" propTypes={DateTimeField.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel style={{ minHeight: '7rem' }}>
               <Panel horizontal>
                  <DateField id="Date" {...this.state} />
                  <TimeField id="Time" {...this.state} />
                  <DateTimeField id="DateTime" {...this.state} />
               </Panel>
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
            <DateTimeField id="MyDateTimeField" plainText={plainText} validationMessages={validationMessages} />
         </RenderCustomize>
      );
   }
}

export default withTheme(FormDateTimeField);
