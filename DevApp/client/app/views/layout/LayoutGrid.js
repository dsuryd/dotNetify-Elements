import React from "react";
import { Footer, Header, Main, Markdown, Nav, Panel, Section, withTheme } from "dotnetify-elements";
import { Article } from "../../components";
import { DemoArea, DemoLabel, demoTheme } from "./demo-helper";

const LayoutGrid = _ => (
  <Article vm="LayoutGrid" id="Content">
    <Markdown id="Content">
      <LayoutGridExample />
    </Markdown>
  </Article>
);

const LayoutGridExample = props => (
  <Panel css="padding: 3rem 0; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc">
    <LayoutGridDemo />
  </Panel>
);

const LayoutGridDemo = _ => (
  <DemoArea>
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
  </DemoArea>
);

export default withTheme(LayoutGrid);
