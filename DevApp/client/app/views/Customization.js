import React from 'react';
import styled from 'styled-components';
import { Card, Markdown, Panel, VMContext, withTheme } from 'dotnetify-elements';
import Expander from '../components/Expander';
import Article from '../components/Article';

const Customization = props => (
   <Article vm="Customization" id="Content">
      <Markdown id="Content">
         <CssOverrideExample />
      </Markdown>
   </Article>
);

const helloCss = `
   width: 300px;
   height: 200px;
   border-radius: 20px;
   .card-header {
      border-radius: 20px 20px 0 0;
      background: #ef3d33;
      header {
         color: white;
         text-align: center;
         .title {
            font-size: 28px;
            font-weight: bold;
         }
      }
   } 
   .card-footer {
      background: #ef3d33;
      border-radius: 0 0 20px 20px;
   }
`;

const CssOverrideExample = props => {
   const sourceCode = `
\`\`\`jsx
const helloCss = \`
   width: 300px;
   height: 200px;
   border-radius: 20px;
   .card-header {
      border-radius: 20px 20px 0 0;
      background: #ef3d33;
      header {
         color: white;
         text-align: center;
         .title {
            font-size: 28px;
            font-weight: bold;
         }
      }
   } 
   .card-footer {
      background: #ef3d33;
      border-radius: 0 0 20px 20px;
   }
\`;

const HelloCard = _ => (
   <Card css={helloCss}>
      <header>
         <title>Hello</title>
         <div>My name is</div>
      </header>
      <footer />
   </Card>
);
\`\`\``;

   return (
      <Panel horizontal css="overflow: hidden">
         <Panel flex>
            <Markdown>{sourceCode}</Markdown>
         </Panel>
         <Panel css="padding-top: 1rem; p { font-weight: 500 }">
            <p>Before:</p>
            <Card>
               <header>
                  <div class="title">Hello</div>
                  <div>My name is</div>
               </header>
               <footer />
            </Card>
            <br />
            <p>After:</p>
            <Card css={helloCss}>
               <header>
                  <div class="title">Hello</div>
                  <div>My name is</div>
               </header>
               <footer />
            </Card>
         </Panel>
      </Panel>
   );
};

export default withTheme(Customization);
