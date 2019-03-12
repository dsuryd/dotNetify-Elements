import React from 'react';
import { CheckboxGroup, Markdown, Panel, TabItem, withTheme } from 'dotnetify-elements';
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
      <CheckboxGroup id="Quizz"${props} />
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="CheckboxGroupExample">
   <d-checkbox-group id="Quizz"${props} />
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      const propTypes = { enable: null, horizontal: null, plainText: null };

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="CheckboxGroupExample"
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            <Panel style={{ minHeight: '13rem' }}>
               {!webComponent ? (
                  <CheckboxGroup id="Quizz" {...this.state} />
               ) : (
                  <d-vm-context vm="CheckboxGroupExample">
                     <d-checkbox-group id="Quizz" {...this.state} />
                  </d-vm-context>
               )}
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
         <RenderCustomize
            vm="CheckboxGroupCustomize"
            name="CheckboxGroup"
            componentTypes={componentTypes}
            select={select}
            onSelected={handleSelected}
         >
            <CheckboxGroup id="MyCheckboxGroup" plainText={plainText} />
         </RenderCustomize>
      );
   }
}

export default withTheme(FormCheckboxGroup);
