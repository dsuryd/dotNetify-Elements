import React from 'react';
import { PropTypes } from 'prop-types';
import * as utils from '../utils';

export class Cell extends React.Component {
   static propTypes = {
      // Which sides of border to show (comma-delimited): top, left, right, bottom.
      borders: PropTypes.string,

      // Text or component for the card's header.
      header: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Sets custom width.
      width: PropTypes.string
   };

   static componentTypes = {
      Container: undefined,
      HeaderContainer: undefined,
      BodyContainer: undefined
   };

   render() {
      const [ Container, Header, Body ] = utils.resolveComponents(Cell, this.props);
      const { header, children, borders, width, style, css, ...props } = this.props;

      const reservedTypes = [ 'header' ];
      const [ sections, body ] = utils.filterChildren(children, child => child && reservedTypes.some(x => x === child.type));
      const _header = header || sections.filter(section => section.type === 'header').shift();
      const headerCss = body ? '' : 'border-bottom: none';

      return (
         <Container borders={borders} width={width} style={style} css={css}>
            {_header ? <Header css={headerCss}>{_header}</Header> : null}
            {body ? <Body>{body}</Body> : null}
         </Container>
      );
   }
}
