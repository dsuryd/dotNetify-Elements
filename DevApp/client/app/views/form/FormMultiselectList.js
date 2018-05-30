import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, MultiselectList, Panel, Tab, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormMultiselectList = props => (
   <TabsArticle vm="FormMultiselectList" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <MultiselectListExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <MultiselectListCustomize />
      </TabItem>
   </TabsArticle>
);

class MultiselectListExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, MultiselectList } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="MultiselectListExample">
      <MultiselectList id="VisitPurpose" ${props}/>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="MultiselectListExample" propTypes={MultiselectList.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel style={{ minHeight: '7rem' }}>
               <MultiselectList id="VisitPurpose" {...this.state} />
            </Panel>
         </RenderExample>
      );
   }
}

class MultiselectListCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText, validationMessages } = this.state;
      const componentTypes = MultiselectList.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent',
         validationMessages: value === 'ValidationMessageComponent' ? [ 'Validation message' ] : null
      });
      return (
         <RenderCustomize vm="MultiselectListCustomize" name="MultiselectList" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <MultiselectList id="MyMultiselectList" plainText={plainText} validationMessages={validationMessages} />
         </RenderCustomize>
      );
   }
}

export default withTheme(FormMultiselectList);
