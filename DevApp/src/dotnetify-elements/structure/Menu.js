import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Label } from '../display/Label';
import * as utils from '../utils';

const Container = styled.div`
   ${props => props.theme.Menu.Container};
   ${props => props.css};
   position: relative;
   ul {
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

      li {
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
            border-bottom: 1px solid black;
            background-color: black;
         }

         &.submenu::after {
            content: "";
            position: absolute;
            right: 6px;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            border: 5px solid transparent;
            border-left-color: gray;
         }

         &.submenu:hover {
            margin-right: -2px;
            > button {
               border-top-right-radius: 0;
               border-bottom-right-radius: 0;
            }
         }

         &.submenu:hover::after {
            border-left-color: gray;
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
      }
   }
`;

Container.defaultProps = { theme: utils.getDefaultTheme() };

export class Menu extends React.Component {
   static propTypes = {
      for: PropTypes.string
   };

   static componentTypes = {
      Container
   };

   constructor(props) {
      super(props);
      this.elemRef = React.createRef();
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

      const onClick = e => {
         if (e.target.parentElement.parentElement.classList.contains('submenu')) return;
         this.hideMenu();
         this.elemRef.current.querySelector('ul').removeEventListener('click', onClick);
         document.removeEventListener('click', onClick);
      };

      const onClickTarget = e => {
         e.preventDefault();
         this.showMenu(e.target.pageX, e.target.pageY);
         this.elemRef.current.querySelector('ul').addEventListener('click', onClick, false);
         setTimeout(() => document.addEventListener('click', onClick, false));
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

   componentDidMount() {
      this.triggerElem = this.triggerElem || this.configureTrigger(this.props.for);
   }

   render() {
      const [ Container ] = utils.resolveComponents(Menu, this.props);
      const { children, tabIndex, css, style, ...props } = this.props;

      return (
         <Container style={style} css={css} tabIndex={tabIndex} ref={this.elemRef}>
            {children}
         </Container>
      );
   }
}
