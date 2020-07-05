import React, { useState, useContext } from "react";
import { Footer, Header, Main, Markdown, Nav, Panel, Section, withTheme } from "dotnetify-elements";
import { Article, FrameworkContext, currentFramework } from "../../components";
import { DemoArea, DemoLabel, demoTheme } from "./demo-helper";

const LayoutGrid = _ => {
  const [framework, setFramework] = useState(currentFramework);
  return (
    <Article vm="LayoutGrid" id="Content" onChangeFramework={x => setFramework(x)}>
      <Markdown id="Content" condition={framework}>
        <LayoutGridExample />
      </Markdown>
    </Article>
  );
};

const LayoutGridExample = props => (
  <Panel css="padding: 3rem 0; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc">
    <LayoutGridDemo />
  </Panel>
);

const LayoutGridDemo = _ => {
  const framework = useContext(FrameworkContext);
  return (
    <DemoArea>
      {framework === "React" ? (
        <Main theme={demoTheme}>
          <Header>
            <DemoLabel>Header</DemoLabel>
          </Header>
          <Nav>
            <DemoLabel>Nav</DemoLabel>
          </Nav>
          <Section>
            <DemoLabel>Section</DemoLabel>
          </Section>
          <Footer>
            <DemoLabel>Footer</DemoLabel>
          </Footer>
        </Main>
      ) : (
        <d-main theme={JSON.stringify(demoTheme)}>
          <d-header>
            <DemoLabel>Header</DemoLabel>
          </d-header>
          <d-nav>
            <DemoLabel>Nav</DemoLabel>
          </d-nav>
          <d-section>
            <DemoLabel>Section</DemoLabel>
          </d-section>
          <d-footer>
            <DemoLabel>Footer</DemoLabel>
          </d-footer>
        </d-main>
      )}
    </DemoArea>
  );
};

export default withTheme(LayoutGrid);
