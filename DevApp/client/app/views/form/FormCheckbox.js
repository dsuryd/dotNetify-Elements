import React from 'react';
import styled from 'styled-components';
import { Checkbox, Frame, Markdown, Panel, Tab, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormCheckbox = props => (
   <TabsArticle vm="FormCheckbox" id="Overview">
      <TabItem label="Overview" key="Overview">
         <Markdown id="Overview">
            <CheckboxExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" key="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <CheckboxCustomize />
      </TabItem>
   </TabsArticle>
);

class CheckboxExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, Checkbox } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="CheckboxExample">
      <Checkbox id="Agree" ${props}/>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      const propTypes = { enable: null, plainText: null };
      return (
         <RenderExample vm="CheckboxExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel style={{ minHeight: '4rem' }}>
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

export default withTheme(FormCheckbox);
