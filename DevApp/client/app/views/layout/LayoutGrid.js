import React from 'react';
import styled from 'styled-components';
import { Footer, Header, Main, Markdown, Nav, Panel, Section, defaultTheme, withTheme } from 'dotnetify-elements';
import { Article, RenderCustomize, RenderExample } from '../../components';

const LayoutGrid = props => (
   <Article vm="LayoutGrid" id="Content">
      <Markdown id="Content">
         <LayoutGridExample />
      </Markdown>
   </Article>
);

const myTheme = {
   ...defaultTheme,
   Main: `border: 2px dashed tomato`,
   Header: `background: #666`,
   Nav: `background: #eee; width: 100px;`,
   Section: `background: #ddd`,
   Footer: `background: #fff`
};

const DemoArea = styled.div`
   width: 640px;
   height: 480px;
   margin: 0 auto;
`;

const Watermark = styled.div`
   display: flex;
   flex: 1;
   font-size: 2rem;
   font-weight: bold;
   align-items: center;
   justify-content: center;
   color: #bbb;
`;

const LayoutGridExample = props => (
   <Panel css="padding: 3rem 0; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc">
      <LayoutGridDemo />
   </Panel>
);

const LayoutGridDemo = _ => (
   <DemoArea>
      <Main theme={myTheme}>
         <Header>
            <Watermark>Header</Watermark>
         </Header>
         <Nav>
            <Watermark>Nav</Watermark>
         </Nav>
         <Section>
            <Watermark>Section</Watermark>
         </Section>
         <Footer>
            <Watermark>Footer</Watermark>
         </Footer>
      </Main>
   </DemoArea>
);

export default withTheme(LayoutGrid);
