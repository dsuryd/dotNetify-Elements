import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../theme';

const LayoutGrid = styled.main`
    display: grid;
    height: 100%;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:    "header header"
                            "nav    section"
                            "nav    footer";
`;

export const Theme = props => (
    <ThemeProvider theme={props.theme || defaultTheme}>{props.children}</ThemeProvider>
);

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
    background: ${props => props.theme.header};    
`;

export const Nav = styled.nav`
    grid-area: nav;
    width: ${props => props.width || '250px'};
    background: ${props => props.theme.nav};    
`;

export const Footer = styled.footer`
    grid-area: footer;
    height: 50px;
    background: ${props => props.theme.footer};    
`;

export const Section = styled.section`
    grid-area: section;
    background: ${props => props.theme.section}; 
    overflow: auto;
`;