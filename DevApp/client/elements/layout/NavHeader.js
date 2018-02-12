import React from 'react';
import styled from 'styled-components';

export const NavHeader = styled.div`
   width: 250px;
   height: 55px;
   display: flex;
   align-items: center;    
   ${props => props.theme.NavHeader}
`;