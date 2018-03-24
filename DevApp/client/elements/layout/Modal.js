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

      const [ sections, body ] = utils.filterChildren(children, child => child && (child.type === 'header' || child.type === 'footer'));
      const _header = header || sections.filter(section => section.type === 'header').shift();
      const _footer = footer || sections.filter(section => section.type === 'footer').shift();

      return (
         <Container isOpen={show} centered={centered} size={size}>
            {_header ? <Header>{_header}</Header> : null}
            <Body>{body}</Body>
            {_footer ? <Footer>{_footer}</Footer> : null}
         </Container>
      );
   }
}
