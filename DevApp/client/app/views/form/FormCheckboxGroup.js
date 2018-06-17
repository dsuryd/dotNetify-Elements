import React from 'react';
import styled from 'styled-components';
import { CheckboxGroup, Frame, Markdown, Panel, Tab, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormCheckboxGroup = props => (
   <TabsArticle vm="FormCheckboxGroup" id="Overview">
      <TabItem label="Overview" key="Overview">
         <Markdown id="Overview">
            <CheckboxGroupExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" key="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <CheckboxGroupCustomize />
      </TabItem>
   </TabsArticle>
);

class CheckboxGroupExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, CheckboxGroup } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="CheckboxGroupExample">
      <CheckboxGroup id="Quizz" ${props}/>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="CheckboxGroupExample" propTypes={CheckboxGroup.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel style={{ minHeight: '13rem' }}>
               <CheckboxGroup id="Quizz" {...this.state} />
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
            <CheckboxGroup id="MyCheckboxGroup" plainText={plainText} />
         </RenderCustomize>
      );
   }
}

export default withTheme(FormCheckboxGroup);
