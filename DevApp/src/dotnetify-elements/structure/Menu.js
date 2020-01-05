import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';

const Container = styled.div`
   ${props => props.theme.Collapsible.Container};
   ${props => props.css};
`;

const _Menu = styled.menu`
   position: absolute;
   width: 200px;
   padding: 2px;
   margin: 0;
   border: 1px solid black;
   background: white;
   z-index: 100;
   border-radius: $mi-base-border-radius;
   box-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
   opacity: 0;
   -webkit-transform: translate(0, 15px) scale(.95);
   transform: translate(0, 15px) scale(.95);
   transition: transform 0.1s ease-out, opacity 0.1s ease-out;
   pointer-events: none;

   menu {
      top: 0px;
      left: 100%;
   }

   &.show-menu {
      opacity: 1;
      -webkit-transform: translate(0, 0) scale(1);
      transform: translate(0, 0) scale(1);
      pointer-events: auto;
   }
`;

const MenuItem = styled.li`
   display: block;
   position: relative;
   margin: 0;
   padding: 0;
   white-space: nowrap;

   &[menu-icon] {
      position: absolute;
      padding-top: 2px;
      color: black;
   }

   > button {
      background: none;
      line-height: normal;
      overflow: visible;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      display: block;
      width: 100%;
      font-size: 12px;
      text-align: left;
      cursor: pointer;
      border: 1px solid transparent;
      white-space: nowrap;
      padding: 6px 8px;
      border-radius: 5px;

      &::-moz-focus-inner,
      &::-moz-focus-inner {
         border: 0;
         padding: 0;
      }

      label {
         margin-left: 25px;
         font-size: inherit;
         color: inherit;
      }
   }

   &:hover {
      > button {
         color: white;
         outline: none;
         background-color: silver;

         [menu-icon] {
            color: white;
         }
      }
   }

   &[submenu]:hover {
      margin-right: -2px;
      > button {
         border-top-right-radius: 0;
         border-bottom-right-radius: 0;
      }
   }

   &[disabled] {
      opacity: .5;
      pointer-events: none;
   }

   &[disabled] > button {
      cursor: default;
   }

   &[separator] {
      display: block;
      margin: 7px 5px;
      height: 1px;
      border-bottom: 1px solid $mi-color-mocha-03;
      background-color: $mi-color-mocha-03;
   }

   &[submenu]::after {
      content: "";
      position: absolute;
      right: 6px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-left-color: $mi-color-mocha-05;
   }

   &[submenu]:hover::after {
      border-left-color: $mi-color-white;
   }

   menu menu {
      top: 0px;
      left: 100%;
   }

   &:hover > menu {
      opacity: 1;
      -webkit-transform: translate(0, 0) scale(1);
      transform: translate(0, 0) scale(1);
      pointer-events: auto;
   }

   &:hover > menu {
      -webkit-transition-delay: 100ms;
      transition-delay: 250ms;
   }
`;

Container.defaultProps = { theme: utils.getDefaultTheme() };

export class Menu extends React.Component {
   static propTypes = {};

   static componentTypes = {
      Container
   };

   constructor(props) {
      super(props);
   }

   configureContextMenu() {
      const onClick = e => {
         this.hideMenu();
         document.removeEventListener('click', onClick);
      };

      const onContextMenu = e => {
         e.preventDefault();
         this.showMenu(e.pageX, e.pageY);
         document.addEventListener('click', onClick, false);
      };

      document.addEventListener('contextmenu', onContextMenu, false);
      this.removeEventListeners.push(() => document.removeEventListener('contextMenu', onContextMenu));
   }

   configureTrigger() {
      const onClick = e => {
         if (e.target.parentElement.attributes.submenu) return;
         this.hideMenu();
         this.menuElem.nativeElement.removeEventListener('click', onClick);
         document.removeEventListener('click', onClick);
      };

      const onClickTarget = e => {
         e.preventDefault();
         this.showMenu(e.target.pageX, e.target.pageY);
         this.menuElem.nativeElement.addEventListener('click', onClick, false);
         setTimeout(() => document.addEventListener('click', onClick, false));
      };
      this.triggerElem.nativeElement.addEventListener('click', onClickTarget, false);
   }

   hideMenu() {
      const menu = this.menuElem.nativeElement.querySelector('menu');
      menu.classList.remove('show-menu');
   }

   initMenu() {
      this.menuElem.nativeElement.querySelectorAll('menu').forEach(x => x.classList.add('menu'));
   }

   onSelected(key) {
      this.selected.emit(key);
   }

   showMenu(x, y) {
      const menu = this.menuElem.nativeElement.querySelector('menu');
      menu.style.left = x + 'px';
      menu.style.top = y + 'px';
      menu.classList.add('show-menu');
   }

   render() {
      const [ Container ] = utils.resolveComponents(Menu, this.props);
      const { tabIndex, css, style, ...props } = this.props;

      return <Container style={style} css={css} tabIndex={tabIndex} />;
   }
}
