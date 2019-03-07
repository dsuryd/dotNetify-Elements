import React from 'react';
import { Markdown, withTheme } from 'dotnetify-elements';
import Article from '../../../components/Article';

const WebComponents = _ => (
   <Article vm="WebComponents" id="Content">
      <Markdown id="Content">
         <BasicDemo />
      </Markdown>
   </Article>
);

const BasicDemo = () => (
   <React.Fragment>
      <d-vm-context vm="SampleForm">
         <d-panel css="border: 1px solid red; padding: 1rem">
            <d-panel css="border: 1px solid green; padding: 1rem">
               <d-alert success="true">
                  Alert<br />
                  <b>Test</b>
               </d-alert>
               <d-text-field id="MyText" />
            </d-panel>
         </d-panel>
      </d-vm-context>
   </React.Fragment>
);

export default withTheme(WebComponents);
