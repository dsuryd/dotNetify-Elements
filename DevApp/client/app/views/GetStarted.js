import React from 'react';
import { Markdown, withTheme } from 'dotnetify-elements';
import Article from '../components/Article';

const GetStarted = _ => (
   <Article vm="ElementsGetStarted" id="Content">
      <Markdown id="Content" />
   </Article>
);

export default withTheme(GetStarted);
