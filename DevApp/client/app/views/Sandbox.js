import React from 'react';
import { Markdown, withTheme } from 'dotnetify-elements';
import Article from '../components/Article';

const Sandbox = _ => (
   <Article vm="Sandbox" id="Content">
      <Markdown id="Content">
         <BasicDemo />
      </Markdown>
   </Article>
);

const BasicDemo = () => (
   <d-vm-context vm="HelloWorld">
      <d-element id="Greetings">
         <d-card test="test">
            <h1 slot="value" />
         </d-card>
      </d-element>
   </d-vm-context>
);

export default withTheme(Sandbox);
