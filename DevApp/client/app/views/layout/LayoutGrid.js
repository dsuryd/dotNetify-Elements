import React from 'react';
import styled from 'styled-components';
import { Footer, Header, Main, Markdown, Nav, Section, withTheme } from 'elements';
import { Article, RenderCustomize, RenderExample } from '../../components';

const LayoutGrid = props => (
   <Article vm="LayoutGrid" id="Content">
      <Markdown id="Content" />
   </Article>
);

export default withTheme(LayoutGrid);
