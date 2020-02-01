import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RouteLink } from 'dotnetify';
import Element from '../core/Element';
import { Label } from '../display/Label';
import * as utils from '../utils';

const Container = styled.div`
   position: relative;
   ${props => props.theme.Menu.Container};
   ${props => props.css};
`;

const GroupContainer = styled.ul`
   position: absolute;
   width: 200px;
   padding: 2px;
   margin: 0;
   z-index: 100;
   border: 1px solid #ccc;
   border-radius: 5px;
   box-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
   opacity: 0;
   -webkit-transform: translate(0, 15px) scale(.95);
   transform: translate(0, 15px) scale(.95);
   transition: transform 0.1s ease-out, opacity 0.1s ease-out;
   pointer-events: none;

   ul {
      top: 0px;
      left: 100%;
   }

   &.show {
      opacity: 1;
      -webkit-transform: translate(0, 0) scale(1);
      transform: translate(0, 0) scale(1);
      pointer-events: auto;
   }
   ${props => props.theme.Menu.GroupContainer};
`;

const ItemContainer = styled.li`
   font-size: inherit !important;
   display: block;
   position: relative;
   margin: 0;
   padding: 0;
   white-space: nowrap;

   > button {
      background: none;
      line-height: normal;
      overflow: visible;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      display: block;
      width: 100%;
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
   }

   &:hover {
      > button {
         outline: none;
      }
   }

   &[disabled] {
      opacity: .5;
      pointer-events: none;
   }

   &[disabled] > button {
      cursor: default;
   }

   &.separator {
      display: block;
      margin: 7px 5px;
      height: 1px;
      border-bottom: 1px solid #ccc;
   }

   &.submenu::after {
      content: "";
      position: absolute;
      right: 6px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      border: 5px solid transparent;
   }

   &.submenu:hover {
      margin-right: -2px;
      > button {
         border-top-right-radius: 0;
         border-bottom-right-radius: 0;
      }
   }

   &.submenu:hover::after {
      margin-right: 2px;
      border-left-color: #337ab7;
   }

   ul ul {
      top: 0px;
      left: 100%;
   }

   &:hover > ul {
      opacity: 1;
      -webkit-transform: translate(0, 0) scale(1);
      transform: translate(0, 0) scale(1);
      pointer-events: auto;
   }

   &:hover > ul {
      -webkit-transition-delay: 100ms;
      transition-delay: 250ms;
   }
   ${props => props.theme.Menu.ItemContainer};
`;

Container.defaultProps = { theme: utils.getDefaultTheme() };
GroupContainer.defaultProps = { theme: utils.getDefaultTheme() };
ItemContainer.defaultProps = { theme: utils.getDefaultTheme() };

export class Menu extends Element {
   static propTypes = {
      for: PropTypes.string
   };

   static componentTypes = {
      Container,
      GroupContainer,
      ItemContainer,
      MenuLabelComponent: Label
   };

   constructor(props) {
      super(props);
      this.elemRef = React.createRef();
   }

   componentDidMount() {
      this.triggerElem = this.triggerElem || this.configureTrigger(this.props.for);
   }

   buildMenu(menuItems) {
      const [ , GroupContainer, ItemContainer, MenuLabel ] = utils.resolveComponents(Menu, this.props);
      return (
         <GroupContainer>
            {menuItems.map((menuItem, idx) => {
               return (
                  <ItemContainer key={idx} disabled={menuItem.Disabled}>
                     {menuItem.Label && (
                        <button>
                           <RouteLink vm={this.vm} route={menuItem.Route}>
                              <MenuLabel icon={menuItem.Icon}>{menuItem.Label}</MenuLabel>
                           </RouteLink>
                        </button>
                     )}
                     {menuItem.SubMenu && this.buildMenu(menuItem.SubMenu)}
                  </ItemContainer>
               );
            })}
         </GroupContainer>
      );
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

   configureTrigger(triggerId) {
      const triggerElem = document.getElementById(triggerId);
      const getMenuElem = () => this.elemRef.current && this.elemRef.current.querySelector('ul');

      const onClick = e => {
         if (e.target.parentElement.parentElement.classList.contains('submenu')) return;
         this.hideMenu();
         getMenuElem().removeEventListener('click', onClick);
         document.removeEventListener('click', onClick);
      };

      const onClickTarget = e => {
         e.preventDefault();
         const menuElem = getMenuElem();
         if (menuElem && !menuElem.classList.contains('show')) {
            this.showMenu(e.target.pageX, e.target.pageY);
            menuElem.addEventListener('click', onClick, false);
            setTimeout(() => document.addEventListener('click', onClick, false));
         }
      };

      this.initMenu();
      triggerElem.addEventListener('click', onClickTarget, false);
      return triggerElem;
   }

   hideMenu() {
      this.elemRef.current.querySelector('ul').classList.remove('show');
   }

   initMenu() {
      this.elemRef.current.querySelectorAll('li').forEach(x => {
         if (x.querySelector('ul')) x.classList.add('submenu');
         if (x.children.length == 0) x.classList.add('separator');
      });
   }

   onSelected(key) {
      this.selected.emit(key);
   }

   showMenu(x, y) {
      const menu = this.elemRef.current.querySelector('ul');
      menu.style.left = x + 'px';
      menu.style.top = y + 'px';
      menu.classList.add('show');
   }

   render() {
      const [ Container ] = utils.resolveComponents(Menu, this.props);
      const { children, tabIndex, css, style, ...props } = this.props;

      const menu = Array.isArray(this.value) ? this.buildMenu(this.value) : children;

      return (
         <Container style={style} css={css} tabIndex={tabIndex} ref={this.elemRef}>
            {menu}
         </Container>
      );
   }
}
