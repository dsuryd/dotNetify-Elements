import React from 'react';
import styled from 'styled-components';
import { Main, Header, Section } from 'dotnetify-elements';
import { Button, Card, Markdown, Panel, VMContext, withTheme } from 'dotnetify-elements';
import Expander from '../components/Expander';
import Article from '../components/Article';

const LayoutSystem = props => (
   <Article vm="LayoutSystem" id="Content">
      <Markdown id="Content">
         <DefaultPanelLayout />
         <HorizontalPanelLayout />
         <FlexPanelLayout />
         <CssPanelLayout />
         <BootstrapExampleLayout />
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
      <Panel flex>
         <Panel>
            <Item>1</Item>
            <Item>2</Item>
            <Item>3</Item>
         </Panel>
      </Panel>
      <Panel flex>
         <SourceCode>{panelSource()}</SourceCode>
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
         <SourceCode>{panelSource('horizontal')}</SourceCode>
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
      <Panel flex>
         <Item>1</Item>
      </Panel>
      <Item>2</Item>
      <Panel flex right>
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
      <Panel flex>
         <Panel flex="0" horizontal css={customCss}>
            <Panel flex>
               <Item>1</Item>
            </Panel>
            <Item>2</Item>
            <Panel flex right>
               <Item className="make-me-red">3</Item>
            </Panel>
         </Panel>
      </Panel>
      <Panel flex>
         <SourceCode>{cssPanelSource()}</SourceCode>
      </Panel>
   </Panel>
);

const DemoArea = styled.div`
   height: 480px;
   margin: 0 auto;
   padding: 1rem;
`;

const headerCss = `
   margin-bottom: 3rem; 
   border-bottom: 1px solid gray; 
   box-shadow: none;
`;

const sectionCss = `
   background: #f8f8f8;
`;

const BootstrapExampleLayout = _ => (
   <DemoArea>
      <Main>
         <Header css={headerCss}>
            <Panel flex>
               <Panel>
                  <a href="#">Subscribe</a>
               </Panel>
            </Panel>
            <h1>Large</h1>
            <Panel flex right>
               <Panel>
                  <Button>Sign up</Button>
               </Panel>
            </Panel>
         </Header>
         <Section css={sectionCss} />
      </Main>
   </DemoArea>
);

export default withTheme(LayoutSystem);
