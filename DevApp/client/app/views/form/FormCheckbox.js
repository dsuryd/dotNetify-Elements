import React from 'react';
import { Checkbox, Markdown, Panel, TabItem, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormCheckbox = props => (
   <TabsArticle vm="FormCheckbox" id="Overview">
      <TabItem label="Overview" itemKey="Overview">
         <Markdown id="Overview">
            <CheckboxExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
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
      <Checkbox id="Agree"${props} />
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="CheckboxExample">
   <d-checkbox id="Agree"${props} />
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      const propTypes = { enable: null, plainText: null, switch: null };

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="CheckboxExample"
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            <Panel style={{ minHeight: '4rem' }}>
               {!webComponent ? (
                  <Checkbox id="Agree" {...this.state} />
               ) : (
                  <d-vm-context vm="CheckboxExample">
                     <d-checkbox id="Agree" {...this.state} />
                  </d-vm-context>
               )}
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
         <RenderCustomize
            vm="CheckboxCustomize"
            name="Checkbox"
            componentTypes={componentTypes}
            select={select}
            onSelected={handleSelected}
         >
            <Checkbox id="MyCheckbox" plainText={plainText} />
         </RenderCustomize>
      );
   }
}

export default withTheme(FormCheckbox);
