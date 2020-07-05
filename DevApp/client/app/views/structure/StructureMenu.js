import React from "react";
import { Label, Menu, Markdown, Panel, TabItem, withTheme } from "dotnetify-elements";
import { FrameworkContext, TabsArticle, RenderCustomize, RenderExample } from "../../components";

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
    <TabItem label="Customize">
      <MenuCustomize />
    </TabItem>
  </TabsArticle>
);

class MenuExample extends React.Component {
  static contextType = FrameworkContext;
  render() {
    const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, Menu } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="MenuExample">
      <Label id="open-menu" css="cursor: pointer">Open Menu...</Label>
      <Menu id="Menu"${props} openFor="open-menu" width="12rem" />
   </VMContext>
);
\`\`\``;
    const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="MenuExample">
   <d-label id="open-menu" css="cursor: pointer">Open Menu...</d-label>
   <d-menu id="Menu"${props} openfor="open-menu" width="12rem" />
</d-vm-context>
\`\`\``;
    const setState = state => this.setState(state);
    const propTypes = {};

    const webComponent = this.context !== "React";
    const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

    return (
      <RenderExample vm="MenuExample" propTypes={propTypes} buildCode={selectBuildCode} onChange={setState}>
        <Panel style={{ minHeight: "4rem" }}>
          {!webComponent ? (
            <div>
              <Label id="open-menu" css="cursor: pointer">
                Click to open...
              </Label>
              <Menu id="Menu" {...this.state} openFor="open-menu" width="12rem" />
            </div>
          ) : (
            <d-vm-context vm="MenuExample">
              <d-label id="open-menu" css="cursor: pointer">
                Click to open...
              </d-label>
              <d-menu id="Menu" {...this.state} openfor="open-menu" width="12rem" />
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
      <Panel>
        <a id="Trigger" href="#">
          Show menu
        </a>
        <RenderCustomize
          name="Menu"
          vm="MenuCustomize"
          componentTypes={componentTypes}
          select={select}
          onSelected={handleSelected}
        >
          <Menu id="MyMenu" openFor="Trigger" />
        </RenderCustomize>
      </Panel>
    );
  }
}

export default withTheme(StructureMenu);
