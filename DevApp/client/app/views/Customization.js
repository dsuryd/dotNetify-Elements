import React from 'react';
import { Button, Card, Markdown, Panel, TextField, VMContext, withTheme } from 'dotnetify-elements';
import Article from '../components/Article';
import { themeToggleEvent } from './layout/demo-helper';
import MuiTextField from '@material-ui/core/TextField';

const Customization = props => (
   <Article vm="Customization" id="Content">
      <Markdown id="Content">
         <CssOverrideExample />
         <GlobalThemeExample />
         <SubComponentExample />
      </Markdown>
   </Article>
);

const helloCss = `
   max-width: 300px;
   height: 200px;
   border-radius: 20px;
   .card-header {
      border-radius: 20px 20px 0 0;
      background: #ef3d33;
      > * {
         color: white;
         text-align: center;
         h5 { font: bold 28px arial; }
      }
   } 
   .card-footer {
      background: #ef3d33;
      border-radius: 0 0 20px 20px;
   }
`;

const CssOverrideExample = _ => {
   const sourceCode = `
\`\`\`jsx
const helloCss = \`
   max-width: 300px;
   height: 200px;
   border-radius: 20px;
   .card-header {
      background: #ef3d33;
      border-radius: 20px 20px 0 0;
      > * {
         color: white;
         text-align: center;
         h5 { font: bold 28px arial; }
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
         <h5>Hello</h5>
         <div>My name is</div>
      </header>
      <footer />
   </Card>
);
\`\`\``;

   return (
      <Panel horizontal css="overflow: hidden">
         <Panel flex css="padding-top: 1rem">
            <p>Original:</p>
            <Card>
               <header>
                  <h5>Hello</h5>
                  <div>My name is</div>
               </header>
               <footer />
            </Card>
            <br />
            <p>Override:</p>
            <Card css={helloCss}>
               <header>
                  <h5>Hello</h5>
                  <div>My name is</div>
               </header>
               <footer />
            </Card>
         </Panel>
         <Panel flex>
            <Markdown>{sourceCode}</Markdown>
         </Panel>
      </Panel>
   );
};

const GlobalThemeExample = _ => <Button positive label="Toggle Theme" onClick={_ => themeToggleEvent.emit()} />;

const SubComponentExample = _ => (
   <VMContext vm="SubComponentExample">
      <Card css="background: transparent">
         <Panel horizontal>
            <Panel flex>
               <div>Original:</div>
               <TextField id="Name" horizontal />
            </Panel>
            <Panel flex>
               <div>Override:</div>
               <TextField id="Name" horizontal inputComponent={MuiTextField} />
            </Panel>
         </Panel>
      </Card>
   </VMContext>
);

export default withTheme(Customization);
