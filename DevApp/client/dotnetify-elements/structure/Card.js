import React from 'react';
import { PropTypes } from 'prop-types';
import * as utils from '../utils';

export class Card extends React.Component {
   static propTypes = {
      // Text or component for the card's header.
      header: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Text or component for the card's footer.
      footer: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])
   };

   static componentTypes = {
      Container: undefined,
      ImageContainer: undefined,
      HeaderContainer: undefined,
      BodyContainer: undefined,
      FooterContainer: undefined
   };

   render() {
      const [ Container, Image, Header, Body, Footer ] = utils.resolveComponents(Card, this.props);
      const { header, footer, children, style, css, ...props } = this.props;

      const reservedTypes = [ 'header', 'footer', 'img' ];
      const [ sections, body ] = utils.filterChildren(children, child => child && reservedTypes.some(x => x === child.type));
      const img = sections.filter(section => section.type === 'img').shift();
      const _header = header || sections.filter(section => section.type === 'header').shift();
      const _footer = footer || sections.filter(section => section.type === 'footer').shift();

      return (
         <Container style={style} css={css}>
            {img ? <Image>{img}</Image> : null}
            {_header ? <Header>{_header}</Header> : null}
            <Body>{body}</Body>
            {_footer ? <Footer>{_footer}</Footer> : null}
         </Container>
      );
   }
}
