import React from 'react';
import styled from 'styled-components';

export const NavHeader = styled.div`
width: 200px;
height: 55px;
display: flex;
justify-content: center;
align-items: center;    
background: ${props => props.theme.navHeader};
`;