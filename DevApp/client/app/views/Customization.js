import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Markdown, Panel, VMContext, withTheme } from 'dotnetify-elements';
import Article from '../components/Article';
import { themeToggleEvent } from './layout/demo-helper';

const Customization = props => (
   <Article vm="Customization" id="Content">
      <Markdown id="Content">
         <CssOverrideExample />
         <GlobalThemeExample />
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

const CssOverrideExample = _ => {
   const sourceCode = `
\`\`\`jsx
const helloCss = \`
   max-width: 300px;
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
         <Panel flex css="padding-top: 1rem; p { font-weight: 500 }">
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
         <Panel flex>
            <Markdown>{sourceCode}</Markdown>
         </Panel>
      </Panel>
   );
};

export class GlobalThemeExample extends React.Component {
   static contextTypes = {
      theme: PropTypes.object
   };

   render() {
      let themeJson = JSON.stringify(this.context.theme, null, 4).replace(/\\n/g, '\r\n');
      return (
         <Panel>
            <Button label="Toggle Theme" onClick={_ => themeToggleEvent.emit()} />
            <Markdown>{'```json\r\n' + themeJson + '\r\n```'}</Markdown>
         </Panel>
      );
   }
}

export default withTheme(Customization);
