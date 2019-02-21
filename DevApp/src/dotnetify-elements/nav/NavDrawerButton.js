import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';
import lightTheme from '../theme-light';

const IconContainer = styled.button`
   cursor: pointer;
   height: 2.5rem;
   background: transparent;
   padding: 0.25rem 0.5rem;
   border-radius: 0.25rem;
   border: 1px solid #666;
   display: none;
   fill: #666;
   @media (max-width: 768px) {
      display: block;
   }
   ${props => props.theme.NavDrawerButton};
   ${props => props.css};
`;

IconContainer.defaultProps = { theme: lightTheme };

const HamburgerIcon = _ => (
   <span>
      <svg style={{ width: '24px', height: '24px' }} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
         <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
   </span>
);

export class NavDrawerButton extends React.Component {
   static propTypes = {
      // Icon.
      icon: PropTypes.object
   };

   static componentTypes = {
      IconContainer
   };

   render() {
      const [ IconContainer ] = utils.resolveComponents(NavDrawerButton, this.props);

      const { icon, ...props } = this.props;
      const handleClick = _ => utils.toggleNavDrawer();
      return (
         <IconContainer onClick={handleClick} {...props}>
            {icon ? icon : <HamburgerIcon />}
         </IconContainer>
      );
   }
}
