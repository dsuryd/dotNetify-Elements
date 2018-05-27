import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { Theme } from './Theme';

const LayoutGrid = styled.main`
   display: grid;
   height: 100%;
   grid-template-columns: auto 1fr;
   grid-template-rows: auto 1fr auto;
   grid-template-areas: "header header" "nav    section" "nav    footer";
   ${props => props.theme.Main};
`;

export const Main = props => (
   <Theme theme={props.theme}>
      <LayoutGrid>{props.children}</LayoutGrid>
   </Theme>
);

export const Header = styled.header`
   grid-area: header;
   display: flex;
   align-items: center;
   height: ${props => props.height || '55px'};
   ${props => props.theme.Header};
`;

export const Nav = styled.nav`
   grid-area: nav;
   width: ${props => props.width || '250px'};
   overflow: auto;
   ${props => props.theme.Nav};
`;

export const Footer = styled.footer`
   grid-area: footer;
   display: flex;
   height: 50px;
   ${props => props.theme.Footer};
`;

export const Section = styled.section`
   grid-area: section;
   overflow: auto;
   display: flex;
   ${props => props.theme.Section};
`;
