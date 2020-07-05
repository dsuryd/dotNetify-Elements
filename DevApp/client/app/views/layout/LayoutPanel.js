import React, { useState, useContext } from "react";
import { Button, Frame, Markdown, Panel, TabItem, withTheme } from "dotnetify-elements";
import { currentFramework, FrameworkContext, TabsArticle, RenderExample } from "../../components";
import { Rectangle, Square } from "./demo-helper";

const LayoutPanel = () => {
  const [framework, setFramework] = useState(currentFramework);
  return (
    <TabsArticle vm="LayoutPanel" id="Overview" onChangeFramework={x => setFramework(x)}>
      <TabItem label="Overview" itemKey="Overview">
        <Markdown id="Overview" condition={framework}>
          <PanelExample />
          <FlexLayoutExample />
          <ChildPropsExample />
        </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
        <Markdown id="API" />
      </TabItem>
    </TabsArticle>
  );
};

class PanelExample extends React.Component {
  static contextType = FrameworkContext;
  state = {};
  render() {
    const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Panel } from 'dotnetify-elements';
import { Square, Rectangle } from './demo-helper';

const MyApp = _ => (
   <Panel css="border: 2px dashed #ccc">
      <Panel css="border: 2px dashed red"${props}>
         <Rectangle>1</Rectangle>
         <Square>2</Square>
         <Rectangle>3</Rectangle>
      </Panel>
   </Panel>   
);
\`\`\``;
    const buildWebComponentCode = props => `
\`\`\`jsx
<div style="border: 2px dashed #ccc; height: 16rem; display: flex">
   <d-panel css="border:2px dashed red" flex="1" ${props}>
      <div class="rectangle">1</div>
      <div class="square">2</div>
      <div class="rectangle">3</div>      
   </d-panel>
</d-panel>
\`\`\``;
    const setState = state => this.setState(state);
    const propTypes = {
      apart: null,
      bottom: null,
      center: null,
      horizontal: null,
      middle: null,
      noGap: null,
      noMargin: null,
      right: null,
      smallGap: null,
      smallMargin: null,
      wrap: null
    };

    const webComponent = this.context !== "React";

    return (
      <RenderExample
        propTypes={propTypes}
        defaultProps={Panel.defaultProps}
        buildCode={webComponent ? buildWebComponentCode : buildCode}
        onChange={setState}
      >
        {!webComponent ? (
          <Panel height="16rem">
            <Panel css="border: 2px dashed #ccc">
              <Panel css="border: 2px dashed red" {...this.state}>
                <Rectangle>1</Rectangle>
                <Square>2</Square>
                <Rectangle>3</Rectangle>
              </Panel>
            </Panel>
          </Panel>
        ) : (
          <div
            style={{
              border: "2px dashed #ccc",
              height: "16rem",
              display: "flex"
            }}
          >
            <d-panel
              css="border: 2px dashed red"
              flex="1"
              apart={this.state.apart}
              bottom={this.state.bottom}
              center={this.state.center}
              horizontal={this.state.horizontal}
              middle={this.state.middle}
              noGap={this.state.noGap}
              noMargin={this.state.noMargin}
              right={this.state.right}
              smallGap={this.state.smallGap}
              smallMargin={this.state.smallMargin}
              wrap={this.state.wrap}
            >
              <Rectangle>1</Rectangle>
              <Square>2</Square>
              <Rectangle>3</Rectangle>
            </d-panel>
          </div>
        )}
      </RenderExample>
    );
  }
}

const FlexLayoutExample = props => {
  const framework = useContext(FrameworkContext);
  return framework === "React" ? (
    <Panel css="border: 2px dashed #ccc">
      <Frame>
        <Panel horizontal>
          <Panel horizontal flex css="border: 2px dashed red">
            <Square>1</Square>
            <Square>2</Square>
          </Panel>
          <Panel horizontal css="border: 2px dashed aquamarine">
            <Square>3</Square>
            <Square>4</Square>
          </Panel>
          <Panel css="border: 2px dashed green">
            <Rectangle>5</Rectangle>
            <Rectangle>6</Rectangle>
          </Panel>
        </Panel>
        <Panel horizontal>
          <Panel flex="20%" right css="border: 2px dashed blue">
            <Square>7</Square>
          </Panel>
          <Panel middle css="border: 2px dashed orange">
            <Square>8</Square>
            <Rectangle>9</Rectangle>
          </Panel>
          <Panel flex="30%" css="border: 2px dashed purple">
            <Square>10</Square>
          </Panel>
        </Panel>
      </Frame>
    </Panel>
  ) : (
    <d-panel css="border: 2px dashed #ccc">
      <d-frame>
        <d-panel horizontal>
          <d-panel horizontal flex="1" css="border: 2px dashed red">
            <Square>1</Square>
            <Square>2</Square>
          </d-panel>
          <d-panel horizontal css="border: 2px dashed aquamarine">
            <Square>3</Square>
            <Square>4</Square>
          </d-panel>
          <d-panel css="border: 2px dashed green">
            <Rectangle>5</Rectangle>
            <Rectangle>6</Rectangle>
          </d-panel>
        </d-panel>
        <d-panel horizontal>
          <d-panel flex="20%" right css="border: 2px dashed blue">
            <Square>7</Square>
          </d-panel>
          <d-panel middle css="border: 2px dashed orange">
            <Square>8</Square>
            <Rectangle>9</Rectangle>
          </d-panel>
          <d-panel flex="30%" css="border: 2px dashed purple">
            <Square>10</Square>
          </d-panel>
        </d-panel>
      </d-frame>
    </d-panel>
  );
};

class ChildPropsExample extends React.Component {
  state = {};

  render() {
    const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Panel, Button } from 'dotnetify-elements';

const MyApp = _ => (
   <Panel horizontal childProps={{ css: 'border: 2px dashed red', ${Object.keys(this.state)
     .map(key => `${key}: ${this.state[key]}`)
     .join(", ")}}}>
      <Panel>
         <Button label="Button 1" primary />
      </Panel>
      <Panel>
         <Button label="Button 2" secondary />
      </Panel>
   </Panel>
);
\`\`\``;
    const setState = state => this.setState(state);
    let propTypes = { middle: null, right: null };
    return (
      <RenderExample propTypes={propTypes} buildCode={buildCode} onChange={setState}>
        <Panel css="margin-bottom: 2rem">
          <Panel horizontal childProps={{ ...this.state, css: "border: 2px dashed red" }}>
            <Panel>
              <Button label="Button 1" primary />
            </Panel>
            <Panel>
              <Button label="Button 2" secondary />
            </Panel>
          </Panel>
        </Panel>
      </RenderExample>
    );
  }
}

export default withTheme(LayoutPanel);
