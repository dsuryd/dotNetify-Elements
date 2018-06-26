import React from 'react';
import styled from 'styled-components';
import * as utils from '../utils';

const IconContainer = styled.button`
   cursor: pointer;
   height: 2.5rem;
   background: transparent;
   padding: 0.25rem 0.75rem;
   border-radius: 0.25rem;
   border: 1px solid #999;
   visibility: hidden;
   @media (max-width: 768px) {
      visibility: visible;
   }
   ${props => props.theme.NavDrawerButton};
   ${props => props.css};
`;

const HamburgerIcon = styled.div`
   width: 1.5rem;
   height: 1.5rem;
   vertical-align: middle;
   background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
`;

export const NavDrawerButton = props => {
   const handleClick = _ => utils.toggleNavDrawer();
   return (
      <IconContainer onClick={handleClick} {...props}>
         <HamburgerIcon />
      </IconContainer>
   );
};
