import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as utils from '../utils';

const Container = styled.div`
   display: flex;
   flex: ${utils.flexAuto};
   width: inherit;
`;

export class Theme extends React.Component {
   static propTypes = {
      // Object consisting of pairs of element names and their CSS styles.
      theme: PropTypes.object
   };

   static childContextTypes = {
      theme: PropTypes.object
   };

   static _root = null;
   static get currentTheme() {
      return Theme._root ? Theme._root.currentTheme : utils.getDefaultTheme();
   }

   constructor(props) {
      super(props);
      if (!Theme._root) {
         Theme._root = this;
         Theme._root.currentTheme = null;
         Theme._root.onChange = utils.createEventEmitter();
      }
   }

   get theme() {
      const theme = this.props.theme || utils.getDefaultTheme();

      if (this === Theme._root && Theme._root.currentTheme !== theme) {
         if (Theme._root.currentTheme) document.documentElement.classList.remove(`theme-${Theme._root.currentTheme.name}`);
         document.documentElement.classList.add(`theme-${theme.name}`);
         Theme._root.currentTheme = theme;

         Theme._root.onChange.emit(theme);
      }

      return theme;
   }

   getChildContext() {
      return { ...this.context, theme: this.theme };
   }

   render() {
      const { theme, children, ...props } = this.props;
      const numChildren = React.Children.count(children);

      return numChildren > 1 ? (
         <ThemeProvider theme={this.theme} {...props}>
            <Container>{children}</Container>
         </ThemeProvider>
      ) : (
         <ThemeProvider theme={this.theme} children={children} {...props} />
      );
   }
}

export const withTheme = (Component, theme) =>
   class extends React.Component {
      constructor(props) {
         super(props);
         this.state = { theme: theme || (Theme._root ? Theme._root.currentTheme : utils.getDefaultTheme()) };
         if (!props.theme && Theme._root) {
            this.unsubscribe = Theme._root.onChange.subscribe(theme => this.setState({ theme: theme }));
         }
      }
      componentWillUnmount() {
         if (this.unsubscribe) this.unsubscribe();
      }
      render() {
         return (
            <Theme theme={this.state.theme}>
               <Component {...this.props} />
            </Theme>
         );
      }
   };
