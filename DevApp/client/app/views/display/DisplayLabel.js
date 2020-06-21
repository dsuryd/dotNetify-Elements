import React from "react";
import { Element, Label, Markdown, Panel, TabItem, withTheme } from "dotnetify-elements";
import { TabsArticle, RenderCustomize, RenderExample } from "../../components";
import { Badge, BigIcon } from "./demo-helper";

const DisplayLabel = props => (
  <TabsArticle vm="DisplayLabel" id="Overview">
    <TabItem label="Overview" itemKey="Overview">
      <Markdown id="Overview">
        <LabelExample />
      </Markdown>
    </TabItem>
    <TabItem label="API" itemKey="API">
      <Markdown id="API" />
    </TabItem>
    <TabItem label="Customize">
      <LabelCustomize />
    </TabItem>
  </TabsArticle>
);

class LabelExample extends React.Component {
  render() {
    const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Element, Label, Panel, VMContext } from 'dotnetify-elements';
import { Badge, BigIcon } from './demo-helper';

const MyApp = _ => (
   <VMContext vm="LabelExample">
      <Panel>
         <Label id="Clock" icon="material-icons alarm"${props}/>
         <Label id="NotificationLabel" rightIcon={<Badge id="NotificationCount" />}${props}/>
         <Label icon={<BigIcon>info</BigIcon>} css="padding: 1rem; background: white; width: 25rem"${props}>
            <div>
               <b>Attention</b><br />
               You have <Element id="NotificationCount" /> notifications in your inbox.
            </div>
         </Label>
      </Panel>
   </VMContext>
);
\`\`\``;
    const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="LabelExample">
   <d-label id="Clock" icon="material-icons alarm"${props} />
   <d-label id="NotificationLabel" ${props}} css="margin: 1rem 0">
      <d-element
         id="NotificationCount"
         css="padding: .1rem .5rem; margin: 2px .5rem; border-radius: .25rem; font-size: 75%; color: white; background: #fc5c7d"
      />
   </d-label>
   <d-label${props}
      icon="material-icons info"
      css="padding: 1rem; color: black; background: white; width: 25rem; i { font-size: 4rem; color: #1c8adb }">
      <div>
         <b>Attention</b><br />
         You have <d-element id="NotificationCount" /> notifications in your inbox.
      </div>
   </d-label>
</d-vm-context>
\`\`\``;
    const setState = state => this.setState(state);
    let propTypes = { apart: null, bold: null, italic: null, right: null };

    const setWebComponent = show => this.setState({ webComponent: show });
    const webComponent = this.state && this.state.webComponent;
    const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

    return (
      <RenderExample
        vm="LabelExample"
        propTypes={propTypes}
        buildCode={selectBuildCode}
        onChange={setState}
        onWebComponent={setWebComponent}
      >
        <Panel css="margin-bottom: 2rem">
          {!webComponent ? (
            <React.Fragment>
              <Label id="Clock" icon="material-icons alarm" {...this.state} />
              <Label id="NotificationLabel" rightIcon={<Badge id="NotificationCount" />} {...this.state} />
              <Label
                icon={<BigIcon>info</BigIcon>}
                css="padding: 1rem; color: black; background: white; width: 25rem"
                {...this.state}
              >
                <div>
                  <b>Attention</b>
                  <br />
                  You have <Element id="NotificationCount" /> notifications in your inbox.
                </div>
              </Label>
            </React.Fragment>
          ) : (
            <d-vm-context vm="LabelExample">
              <d-label id="Clock" icon="material-icons alarm" {...this.state} />
              <d-label id="NotificationLabel" {...this.state} css="margin: 1rem 0">
                <d-element
                  id="NotificationCount"
                  css="padding: .1rem .5rem; margin: 2px .5rem; border-radius: .25rem; font-size: 75%; color: white; background: #fc5c7d"
                />
              </d-label>
              <d-label
                icon="material-icons info"
                css="padding: 1rem; color: black; background: white; width: 25rem; i { font-size: 4rem; color: #1c8adb }"
                {...this.state}
              >
                <div>
                  <b>Attention</b>
                  <br />
                  You have <d-element id="NotificationCount" /> notifications in your inbox.
                </div>
              </d-label>
            </d-vm-context>
          )}
        </Panel>
      </RenderExample>
    );
  }
}

class LabelCustomize extends React.Component {
  state = {};
  imageData =
    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22255%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20255%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_163d32075fc%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_163d32075fc%22%3E%3Crect%20width%3D%22255%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2294.2578125%22%20y%3D%2296%22%3ELabel%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

  render() {
    const componentTypes = Label.componentTypes;
    const handleSelected = state => this.setState(state);
    const select = value => ({});
    return (
      <RenderCustomize name="Label" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
        <Label icon="material-icons label" rightIcon="material-icons check_circle_outline">
          Label text
        </Label>
      </RenderCustomize>
    );
  }
}

export default withTheme(DisplayLabel);
