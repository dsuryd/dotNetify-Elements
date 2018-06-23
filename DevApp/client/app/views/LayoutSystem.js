import React from 'react';
import styled from 'styled-components';
import { Markdown, Panel, VMContext, withTheme } from 'dotnetify-elements';
import Expander from '../components/Expander';
import Article from '../components/Article';

const LayoutSystem = props => (
   <Article vm="LayoutSystem" id="Content">
      <Markdown id="Content">
         <DefaultPanelLayout />
         <HorizontalPanelLayout />
         <FlexPanelLayout />
      </Markdown>
   </Article>
);

const Item = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 50px;
   height: 50px;
   color: white;
   font-size: x-large;
   background: #999;
`;

const panelSource = props => `
\`\`\`jsx
const MyApp = _ => (
   <Panel${props ? ' ' + props : ''}>
      <Item>1</Item>
      <Item>2</Item>
      <Item>3</Item>
   </Panel>
);
\`\`\``;

const DefaultPanelLayout = _ => (
   <Panel horizontal css="margin: 2rem 0">
      <Panel flex>
         <Panel>
            <Item>1</Item>
            <Item>2</Item>
            <Item>3</Item>
         </Panel>
      </Panel>
      <Panel flex>
         <Markdown css=".prism-code { margin:0 !important }">{panelSource()}</Markdown>
      </Panel>
   </Panel>
);

const HorizontalPanelLayout = _ => (
   <Panel horizontal css="margin: 2rem 0">
      <Panel horizontal flex>
         <Item>1</Item>
         <Item>2</Item>
         <Item>3</Item>
      </Panel>
      <Panel flex>
         <Markdown css=".prism-code { margin:0 !important }">{panelSource('horizontal')}</Markdown>
      </Panel>
   </Panel>
);

const flexPanelSource = props => `
\`\`\`jsx
const MyApp = _ => (
   <Panel horizontal>
      <Panel flex>
         <Item>1</Item>
      </Panel>
      <Item>2</Item>
      <Panel flex right>
         <Item>3</Item>
      </Panel>
   </Panel>
);
\`\`\``;

const FlexPanelLayout = _ => (
   <Panel horizontal css="margin: 2rem 0">
      <Panel horizontal>
         <Panel flex>
            <Item>1</Item>
         </Panel>
         <Item>2</Item>
         <Panel flex right>
            <Item>3</Item>
         </Panel>
      </Panel>
      <Panel flex>
         <Markdown css=".prism-code { margin:0 !important }">{flexPanelSource()}</Markdown>
      </Panel>
   </Panel>
);

export default withTheme(LayoutSystem);
