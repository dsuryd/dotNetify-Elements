import React from 'react';
import { PropTypes } from 'prop-types';
import * as utils from '../utils';

export class Card extends React.Component {
   static propTypes = {
      header: PropTypes.any,
      footer: PropTypes.any,
      css: PropTypes.string
   };

   static componentTypes = {
      Container: undefined,
      HeaderContainer: undefined,
      BodyContainer: undefined,
      FooterContainer: undefined
   };

   render() {
      const [ Container, Header, Body, Footer ] = utils.resolveComponents(Card, this.props);
      const { header, footer, children, css, ...props } = this.props;

      const [ sections, body ] = utils.filterChildren(children, child => child && (child.type === 'header' || child.type === 'footer'));
      const _header = header || sections.filter(section => section.type === 'header').shift();
      const _footer = footer || sections.filter(section => section.type === 'footer').shift();

      return (
         <Container css={css}>
            {_header ? <Header>{_header}</Header> : null}
            <Body>{children}</Body>
            {_footer ? <Footer>{_footer}</Footer> : null}
         </Container>
      );
   }
}
