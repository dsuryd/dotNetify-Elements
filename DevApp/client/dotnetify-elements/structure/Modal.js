import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, FormContextTypes } from '../form/Form';
import * as utils from '../utils';

export class Modal extends React.Component {
   static contextTypes = FormContextTypes;

   static propTypes = {
      header: PropTypes.any,
      footer: PropTypes.any,
      show: PropTypes.bool,
      small: PropTypes.bool,
      large: PropTypes.bool,
      onSubmit: PropTypes.func,
      onSubmitError: PropTypes.func
   };

   static defaultProps = {
      show: true
   };

   static componentTypes = {
      Container: undefined,
      HeaderContainer: undefined,
      BodyContainer: undefined,
      FooterContainer: undefined
   };

   render() {
      const [ Container, Header, Body, Footer ] = utils.resolveComponents(Modal, this.props);
      const { show, small, large, header, footer, children, onSubmit, onSubmitError, ...props } = this.props;
      const centered = true;
      const size = small ? 'sm' : large ? 'lg' : null;

      const [ sections, body ] = utils.filterChildren(children, child => child && (child.type === 'header' || child.type === 'footer'));
      const _header = header || sections.filter(section => section.type === 'header').shift();
      const _footer = footer || sections.filter(section => section.type === 'footer').shift();

      let modalContent = (
         <React.Fragment>
            {_header ? <Header>{_header}</Header> : null}
            <Body>{body}</Body>
            {_footer ? <Footer>{_footer}</Footer> : null}
         </React.Fragment>
      );

      if (onSubmit || onSubmitError)
         modalContent = (
            <Form onSubmit={onSubmit} onSubmitError={onSubmitError}>
               {modalContent}
            </Form>
         );

      return (
         <Container isOpen={show} centered={centered} size={size} style={{ width: '768px' }} {...props}>
            {modalContent}
         </Container>
      );
   }
}
