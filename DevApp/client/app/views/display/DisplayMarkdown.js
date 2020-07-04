import React, { useState, useContext } from "react";
import { Checkbox, Markdown, Panel, TabItem, VMContext, withTheme } from "dotnetify-elements";
import { currentFramework, TabsArticle, RenderCustomize, RenderExample, FrameworkContext } from "../../components";
import { Square } from "../layout/demo-helper";

const DisplayMarkdown = () => {
  const [framework, setFramework] = useState(currentFramework);
  return (
    <TabsArticle vm="DisplayMarkdown" id="Overview" onChangeFramework={x => setFramework(x)}>
      <TabItem label="Overview" itemKey="Overview">
        <Markdown id="Overview" condition={framework}>
          <MarkdownExample />
          <InsetExample />
        </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
        <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
        <MarkdownCustomize />
      </TabItem>
    </TabsArticle>
  );
};

const MarkdownExample = () => {
  const [state, setState] = useState({});
  const framework = useContext(FrameworkContext);
  let propTypes = {};

  return (
    <RenderExample vm="MarkdownExample" propTypes={propTypes} onChange={setState}>
      <Panel css="margin-bottom: 2rem">
        {framework === "React" ? (
          <Markdown id="Content" css="padding: 1rem; color: #000; background: #fff" {...state} />
        ) : (
          <d-vm-context vm="MarkdownExample">
            <d-markdown id="Content" css="padding: 1rem; background: #fff" {...state} />
          </d-vm-context>
        )}
      </Panel>
    </RenderExample>
  );
};

const InsetExample = () => {
  const framework = useContext(FrameworkContext);
  return framework === "React" ? (
    <VMContext vm="InsetExample">
      <Markdown id="Content">
        <Checkbox switch={true} value={true} label="Toggle Me"></Checkbox>
      </Markdown>
    </VMContext>
  ) : (
    <d-vm-context vm="InsetExample">
      <d-markdown id="Content">
        <d-checkbox switch="true" value="true" label="Toggle Me"></d-checkbox>
      </d-markdown>
    </d-vm-context>
  );
};

class MarkdownCustomize extends React.Component {
  state = {};

  render() {
    const componentTypes = Markdown.componentTypes;
    const handleSelected = state => this.setState(state);
    const select = value => ({});
    return (
      <RenderCustomize name="Markdown" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
        <Markdown>{"##### Markdown Header\r\nContent"}</Markdown>
      </RenderCustomize>
    );
  }
}

export default withTheme(DisplayMarkdown);
