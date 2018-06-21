import React from 'react';
import styled from 'styled-components';
import { Markdown, VMContext, withTheme } from 'dotnetify-elements';
import Expander from '../components/Expander';
import Article from '../components/Article';

const Customization = props => (
   <Article vm="Customization" id="Content">
      <Markdown id="Content" />
   </Article>
);

export default withTheme(Customization);
