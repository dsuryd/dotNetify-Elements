import React from 'react';
import styled from 'styled-components';
import { Markdown, Panel, withTheme } from 'dotnetify-elements';
import Article from '../components/Article';

const LayoutSystem = _ => (
   <Article vm="LayoutSystem" id="Content">
      <Markdown id="Content">
         <DefaultPanelLayout />
         <HorizontalPanelLayout />
         <FlexPanelLayout />
         <CssPanelLayout />
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

const SourceCode = props => <Markdown css=".prism-code { margin:0 !important }" {...props} />;

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
      <Panel>
         <Panel>
            <Item>1</Item>
            <Item>2</Item>
            <Item>3</Item>
         </Panel>
      </Panel>
      <Panel>
         <SourceCode>{panelSource()}</SourceCode>
      </Panel>
   </Panel>
);

const HorizontalPanelLayout = _ => (
   <Panel horizontal css="margin: 2rem 0">
      <Panel horizontal>
         <Item>1</Item>
         <Item>2</Item>
         <Item>3</Item>
      </Panel>
      <Panel>
         <SourceCode>{panelSource('horizontal')}</SourceCode>
      </Panel>
   </Panel>
);

const flexPanelSource = props => `
\`\`\`jsx
const MyApp = _ => (
   <Panel horizontal>
      <Item flex>1</Item>
      <Item>2</Item>
      <Panel right>
         <Item>3</Item>
      </Panel>
   </Panel>
);
\`\`\``;

const FlexPanelLayout = _ => (
   <Panel horizontal css="margin: 2rem 0">
      <Panel horizontal>
         <Item flex>1</Item>
         <Item>2</Item>
         <Panel right>
            <Item>3</Item>
         </Panel>
      </Panel>
      <Panel>
         <SourceCode>{flexPanelSource()}</SourceCode>
      </Panel>
   </Panel>
);

const cssPanelSource = props => `
\`\`\`jsx
const customCss = \`
   padding: 1rem; 
   border: 1px solid;
   .make-me-red { background: red; }    
\`;
const MyApp = _ => (
   <Panel horizontal css={customCss}>
      <Item flex>1</Item>
      <Item>2</Item>
      <Panel right>
         <Item className="make-me-red">3</Item>
      </Panel>
   </Panel>
);
\`\`\``;

const customCss = `
   padding: 1rem; 
   border: 1px solid;
   .make-me-red { background: red; }    
`;

const CssPanelLayout = _ => (
   <Panel horizontal>
      <Panel flex="50%" css="height: fit-content">
         <Panel flex="0" horizontal css={customCss}>
            <Item flex>1</Item>
            <Item>2</Item>
            <Panel right>
               <Item className="make-me-red">3</Item>
            </Panel>
         </Panel>
      </Panel>
      <Panel flex="50%">
         <SourceCode>{cssPanelSource()}</SourceCode>
      </Panel>
   </Panel>
);

export default withTheme(LayoutSystem);
