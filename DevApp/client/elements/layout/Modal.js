import React from 'react';
import { PropTypes } from 'prop-types';
import * as utils from '../utils';

export class Modal extends React.Component {
   static componentTypes = {
      Container: undefined,
      HeaderContainer: undefined,
      BodyContainer: undefined,
      FooterContainer: undefined
   };

   render() {
      const [ Container, Header, Body, Footer ] = utils.resolveComponents(Modal, this.props);
      const { show, small, large, header, footer, children, ...props } = this.props;
      const centered = true;
      const size = small ? 'sm' : large ? 'lg' : null;
      return (
         <Container isOpen={show} centered={centered} size={size}>
            {header ? <Header>{header}</Header> : null}
            <Body>{children}</Body>
            {footer ? <Footer>{footer}</Footer> : null}
         </Container>
      );
   }
}
