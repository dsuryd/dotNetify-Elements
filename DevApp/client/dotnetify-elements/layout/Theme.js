import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../theme-light';

const Container = styled.div`
   display: flex;
   flex: 1;
   width: inherit;
`;

export class Theme extends React.Component {
   static childContextTypes = {
      theme: PropTypes.object
   };

   constructor(props) {
      super(props);
      this.theme = this.props.theme || defaultTheme;
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

export const withTheme = Component => props => (
   <Theme>
      <Component {...props} />
   </Theme>
);
