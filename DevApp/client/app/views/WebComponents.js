import React from 'react';
import { Markdown, withTheme } from 'dotnetify-elements';
import Article from '../components/Article';

const WebComponents = _ => (
   <Article vm="WebComponents" id="Content">
      <Markdown id="Content">
         <BasicDemo />
      </Markdown>
   </Article>
);

const BasicDemo = () => (
   <React.Fragment>
      <d-alert value="Alert" success="true" />
      <d-text-field id="_textfield" label="Text Field:" maxlength="3" placeholder="Enter text here" onchange="handleEvent()" />
   </React.Fragment>
);

export default withTheme(WebComponents);
