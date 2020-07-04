import React from "react";
import { Card, NavMenu, Markdown, Panel, TabItem, withTheme } from "dotnetify-elements";
import { FrameworkContext, TabsArticle, RenderCustomize, RenderExample } from "../../components";

const NavigationNavMenu = () => (
  <TabsArticle vm="NavigationNavMenu" id="Overview">
    <TabItem label="Overview" itemKey="Overview">
      <Markdown id="Overview">
        <NavMenuExample />
      </Markdown>
    </TabItem>
    <TabItem label="API" itemKey="API">
      <Markdown id="API" />
    </TabItem>
    <TabItem label="Customize">
      <NavMenuCustomize />
    </TabItem>
  </TabsArticle>
);

class NavMenuExample extends React.Component {
  static contextType = FrameworkContext;
  render() {
    const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Card, NavMenu, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="NavMenuExample">
      <Card>
         <NavMenu id="NavMenu" selected="elements/examples/customer-info"${props} />
      </Card>   
   </VMContext>
);
\`\`\``;
    const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="NavMenuExample">
   <d-card>
      <d-nav-menu id="NavMenu" selected="elements/examples/customer-info"${props} />
   </d-card>
</d-vm-context>
\`\`\``;
    const setState = state => this.setState(state);
    const propTypes = {};

    const webComponent = this.context !== "React";
    const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

    return (
      <RenderExample vm="NavMenuExample" propTypes={propTypes} buildCode={selectBuildCode} onChange={setState}>
        <Panel css="margin-bottom: 2rem">
          {!webComponent ? (
            <Card>
              <NavMenu id="NavMenu" selected="elements/examples/customer-info" {...this.state} />
            </Card>
          ) : (
            <d-vm-context vm="NavMenuExample">
              <d-card>
                <d-nav-menu id="NavMenu" selected="elements/examples/customer-info" {...this.state} />
              </d-card>
            </d-vm-context>
          )}
        </Panel>
      </RenderExample>
    );
  }
}

class NavMenuCustomize extends React.Component {
  state = {};
  render() {
    const componentTypes = NavMenu.componentTypes;
    const handleSelected = state => this.setState(state);
    const select = value => ({});
    return (
      <RenderCustomize
        name="NavMenu"
        vm="NavMenuCustomize"
        componentTypes={componentTypes}
        select={select}
        onSelected={handleSelected}
      >
        <NavMenu id="MyNavMenu" />
      </RenderCustomize>
    );
  }
}

export default withTheme(NavigationNavMenu);
