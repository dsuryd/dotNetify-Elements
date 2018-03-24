import React from 'react';
import { PropTypes } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../theme';

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
      const { theme, ...props } = this.props;
      return <ThemeProvider theme={this.theme} {...props} />;
   }
}
