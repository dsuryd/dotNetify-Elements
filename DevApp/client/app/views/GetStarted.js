import React from 'react';
import styled from 'styled-components';
import { Markdown, VMContext, withTheme } from 'dotnetify-elements';
import Expander from '../components/Expander';
import Article from '../components/Article';

const GetStarted = props => (
   <Article vm="GetStarted" id="Content">
      <Markdown id="Content" />
   </Article>
);

export default withTheme(GetStarted);
