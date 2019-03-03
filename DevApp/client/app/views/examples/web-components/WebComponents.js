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
         <d-alert value="Alert" success="true" />
         <d-text-field id="MyText" />
      </d-vm-context>
   </React.Fragment>
);

export default withTheme(WebComponents);
