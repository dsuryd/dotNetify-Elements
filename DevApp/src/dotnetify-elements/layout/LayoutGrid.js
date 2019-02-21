import React from 'react';
import styled from 'styled-components';
import { Theme } from './Theme';
import lightTheme from '../theme-light';

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

export const Main = ({ theme, ...props }) => (
   <Theme theme={theme}>
      <LayoutGrid {...props} />
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
   z-index: 999;
   ${props => props.theme.Header};
   ${props => props.css};
`;

export const Nav = styled.nav`
   grid-area: nav;
   -ms-grid-column: 1;
   -ms-grid-row: 2;
   -ms-grid-row-span: 2;
   display: flex;
   box-sizing: content-box;
   width: 100%;
   min-width: ${props => props.width || '250px'};
   overflow: auto;
   visibility: visible;
   transition: all 250ms;
   z-index: 998;
   @media (max-width: 768px) {
      margin-left: -${props => props.width || '251px'};
      visibility: hidden;
   }
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

LayoutGrid.defaultProps = { theme: lightTheme };
Header.defaultProps = { theme: lightTheme };
Nav.defaultProps = { theme: lightTheme };
Footer.defaultProps = { theme: lightTheme };
Section.defaultProps = { theme: lightTheme };
