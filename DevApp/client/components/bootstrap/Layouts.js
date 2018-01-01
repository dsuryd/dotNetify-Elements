import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './theme';

export const Main = props => (
    <ThemeProvider theme={props.theme || defaultTheme}>
        <MainGrid>{props.children}</MainGrid>
    </ThemeProvider>
);

export const MainGrid = styled.main`
    display: grid;
    height: 100%;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:    "header header"
                            "nav    section"
                            "nav    footer";
`;

export const Header = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    height: 55px;
    background: ${props => props.theme.header};    
`;

export const Nav = styled.nav`
    display: grid;
    grid-area: nav;
    width: 200px;
    background: ${props => props.theme.nav};    
`;

export const NavHeader = styled.div`
    width: 200px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;    
    background: ${props => props.theme.navHeader};
`;

export const Footer = styled.footer`
    grid-area: footer;
    height: 50px;
    background: ${props => props.theme.footer};    
`;

export const Section = styled.section`
    display: grid;
    grid-area: section;
    background: ${props => props.theme.section};    
`;

export const Panel = styled.div`
    padding: 1rem;
`;