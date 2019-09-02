import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as utils from '../utils';

export class Card extends React.Component {
   static propTypes = {
      // Text or component for the card's header.
      header: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Text or component for the card's footer.
      footer: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Place any image to the side.
      horizontal: PropTypes.bool,

      // Sets custom width.
      width: PropTypes.string
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
      const { header, footer, horizontal, children, width, style, css, tabIndex } = this.props;

      const reservedTypes = [ 'header', 'footer', 'img', 'Image', 'CardImage', 'd-image', 'd-card-image' ];
      const [ sections, body ] = utils.filterChildren(
         children,
         child => child && reservedTypes.some(x => x === child.type || x === child.type._typeName)
      );

      const isImage = comp =>
         [ 'img', 'Image', 'CardImage', 'd-image', 'd-card-image' ].some(x => x === comp.type || x === comp.type._typeName);
      const img = sections.filter(section => isImage(section)).shift();
      const _header = header || sections.filter(section => section.type === 'header').shift();
      const _footer = footer || sections.filter(section => section.type === 'footer').shift();

      // Determine whether the image should be at the bottom.
      const childrenArray = React.Children.toArray(children);
      const lastChild = childrenArray.length > 1 ? childrenArray[childrenArray.length - 1] : null;
      const isBottomImg = lastChild && lastChild.type && isImage(lastChild);
      const leftImg = !isBottomImg && horizontal;
      const rightImg = isBottomImg && horizontal;
      const topImg = !isBottomImg && !horizontal;
      const bottomImg = isBottomImg && !horizontal;

      if (horizontal)
         return (
            <Container horizontal={horizontal} width={width} style={style} css={css} tabIndex={tabIndex}>
               {img && leftImg ? <Image left>{img}</Image> : null}
               {_header ? <Header>{_header}</Header> : null}
               <Body>{body}</Body>
               {_footer ? <Footer>{_footer}</Footer> : null}
               {img && rightImg ? <Image right>{img}</Image> : null}
            </Container>
         );

      return (
         <Container width={width} style={style} css={css} tabIndex={tabIndex}>
            {img && topImg ? <Image>{img}</Image> : null}
            {_header ? <Header>{_header}</Header> : null}
            <Body>{body}</Body>
            {_footer ? <Footer>{_footer}</Footer> : null}
            {img && bottomImg ? <Image bottom>{img}</Image> : null}
         </Container>
      );
   }
}

const CardImageContainer = styled.div`${props => props.css};`;

export class CardImage extends React.Component {
   static _typeName = 'CardImage';
   render() {
      return <CardImageContainer {...this.props} />;
   }
}
