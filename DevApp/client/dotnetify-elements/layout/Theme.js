import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../theme-light';
import * as utils from '../utils';

const Container = styled.div`
   display: flex;
   flex: 1;
   width: inherit;
`;

export class Theme extends React.Component {
   static childContextTypes = {
      theme: PropTypes.object
   };

   static currentTheme = null;
   static onChange = utils.createEventEmitter();

   constructor(props) {
      super(props);
   }

   get theme() {
      const theme = this.props.theme || defaultTheme;
      if (Theme.currentTheme !== theme) {
         if (Theme.currentTheme) document.documentElement.classList.remove(`theme-${Theme.currentTheme.name}`);
         document.documentElement.classList.add(`theme-${theme.name}`);
         Theme.currentTheme = theme;
         Theme.onChange.emit(theme);
      }

      return Theme.currentTheme;
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
         this.state = { theme: props.theme || Theme.currentTheme };
         if (!props.theme) this.unsubscribe = Theme.onChange.subscribe(theme => this.setState({ theme: theme }));
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
