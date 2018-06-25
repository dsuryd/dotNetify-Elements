import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { Theme } from './Theme';

const LayoutGrid = styled.main`
   display: grid;
   display: -ms-grid;
   height: 100%;
   grid-template-columns: auto 1fr;
   grid-template-rows: auto 1fr auto;
   -ms-grid-columns: auto 1fr;
   -ms-grid-rows: auto 1fr auto;
   grid-template-areas: "header header" "nav    section" "nav    footer";
   ${props => props.theme.Main};
   ${props => props.css};
`;

export const Main = props => (
   <Theme theme={props.theme}>
      <LayoutGrid>{props.children}</LayoutGrid>
   </Theme>
);

export const Header = styled.header`
   grid-area: header;
   -ms-grid-row: 1;
   -ms-grid-column-span: 2;
   display: flex;
   align-items: center;
   height: ${props => props.height || '55px'};
   > * {
      height: inherit;
   }
   ${props => props.theme.Header};
   ${props => props.css};
`;

export const Nav = styled.nav`
   grid-area: nav;
   -ms-grid-column: 1;
   -ms-grid-row: 2;
   -ms-grid-row-span: 2;
   width: ${props => props.width || '250px'};
   overflow: auto;
   ${props => props.theme.Nav};
   ${props => props.css};
`;

export const Footer = styled.footer`
   grid-area: footer;
   -ms-grid-row: 3;
   -ms-grid-column-span: 2;
   display: flex;
   height: ${props => props.height || '50px'};
   ${props => props.theme.Footer};
   ${props => props.css};
`;

export const Section = styled.section`
   grid-area: section;
   -ms-grid-column: 2;
   -ms-grid-row: 2;
   overflow: auto;
   display: flex;
   flex-direction: column;
   > * {
      height: inherit;
   }
   ${props => props.theme.Section};
   ${props => props.css};
`;
