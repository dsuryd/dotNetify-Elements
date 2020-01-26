import React from 'react';
import { Label, Menu, Markdown, Panel, TabItem, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureMenu = props => (
   <TabsArticle vm="StructureMenu" id="Overview">
      <TabItem label="Overview" itemKey="Overview">
         <Markdown id="Overview">
            <MenuExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">{/* <MenuCustomize /> */}</TabItem>
   </TabsArticle>
);

class MenuExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, Menu } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="MenuExample">
      <Menu${props} />
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="MenuExample">
   <d-menu${props} />
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      const propTypes = { enable: null };

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="MenuExample"
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            <Panel style={{ minHeight: '4rem' }}>
               <a id="open-menu" href="#">
                  Open Menu...
               </a>
               {!webComponent ? (
                  <Menu id="Menu" {...this.state} for="open-menu" />
               ) : (
                  <d-vm-context vm="MenuExample">
                     <d-menu {...this.state} for="open-menu" />
                  </d-vm-context>
               )}
            </Panel>
         </RenderExample>
      );
   }
}

class MenuCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Menu.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Menu" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Panel>
               <a id="Trigger" href="#">
                  Show menu
               </a>
               <Menu id="MyMenu" for="Trigger" />
            </Panel>
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureMenu);
