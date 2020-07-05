import React from "react";
import { Image, Markdown, Panel, Tab, TabItem, withTheme } from "dotnetify-elements";
import { FrameworkContext, TabsArticle, RenderCustomize, RenderExample } from "../../components";

const StructureTab = () => (
  <TabsArticle vm="StructureTab" id="Overview">
    <TabItem label="Overview" itemKey="Overview">
      <Markdown id="Overview">
        <TabExample />
      </Markdown>
    </TabItem>
    <TabItem label="API" itemKey="API">
      <Markdown id="API" />
    </TabItem>
    <TabItem label="Customize">
      <TabCustomize />
    </TabItem>
  </TabsArticle>
);

class TabExample extends React.Component {
  static contextType = FrameworkContext;
  render() {
    const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Frame, Panel, Tab, TabItem, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="TabExample">
      <Panel css="padding: 2rem; background: white">
         <Tab active="home">
            <TabItem itemKey="home" label="Home">
               <Markdown id="Home" />
            </TabItem>
            <TabItem itemKey="menu" label="Menu">
               <Markdown id="Menu">
                  <Image id="MenuPicture" />
               </Markdown>
            </TabItem>
            <TabItem itemKey="about" label="About">
               <Markdown id="About" />
            </TabItem>
         </Tab>
      </Panel>
   </VMContext>   
);
\`\`\``;
    const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="TabExample">
   <d-tab>
      <d-tab-item itemkey="home" label="Home">
         <d-markdown id="home" />
      </d-tab-item>
      <d-tab-item itemkey="menu" label="Menu">
         <d-markdown id="Menu">
            <d-image id="MenuPicture" />
         </d-markdown>
      </d-tab-item>
      <d-tab-item itemkey="about" label="About">
         <d-markdown id="About" />
      </d-tab-item>
   </d-tab>
</d-vm-context>
\`\`\``;
    const setState = state => this.setState(state);
    const propTypes = {};

    const webComponent = this.context !== "React";
    const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

    return (
      <RenderExample vm="TabExample" propTypes={propTypes} buildCode={selectBuildCode} onChange={setState}>
        <Panel css="padding: 2rem; margin-bottom: 2rem; background: white">
          {!webComponent ? (
            <Tab active="home">
              <TabItem itemKey="home" label="Home">
                <Markdown id="Home" />
              </TabItem>
              <TabItem itemKey="menu" label="Menu">
                <Markdown id="Menu">
                  <Image id="MenuPicture" />
                </Markdown>
              </TabItem>
              <TabItem itemKey="about" label="About">
                <Markdown id="About" />
              </TabItem>
            </Tab>
          ) : (
            <d-vm-context vm="TabExample">
              <d-tab active="home">
                <d-tab-item itemkey="home" label="Home">
                  <d-markdown id="Home" />
                </d-tab-item>
                <d-tab-item itemkey="menu" label="Menu">
                  <d-markdown id="Menu">
                    <d-image id="MenuPicture" />
                  </d-markdown>
                </d-tab-item>
                <d-tab-item itemkey="about" label="About">
                  <d-markdown id="About" />
                </d-tab-item>
              </d-tab>
            </d-vm-context>
          )}
        </Panel>
      </RenderExample>
    );
  }
}

class TabCustomize extends React.Component {
  state = {};

  render() {
    const componentTypes = Tab.componentTypes;
    const handleSelected = state => this.setState(state);
    const select = value => ({});
    return (
      <RenderCustomize name="Tab" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
        <Tab>
          <TabItem label="Tab 1 Label">Tab 1 Body</TabItem>
          <TabItem label="Tab 2 Label">Tab 2 Body</TabItem>
        </Tab>
      </RenderCustomize>
    );
  }
}

export default withTheme(StructureTab);
