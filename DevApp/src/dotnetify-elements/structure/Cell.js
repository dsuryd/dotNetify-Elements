import React from 'react';
import PropTypes from 'prop-types';
import * as utils from '../utils';
import createWebComponent from '../utils/web-component';

export class Cell extends React.Component {
   static propTypes = {
      // Which sides of border to show (comma-delimited): top, left, right, bottom.
      borders: PropTypes.string,

      // Centers the text horizontally.
      center: PropTypes.bool,

      // Text or component for the card's header.
      header: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Centers the text on the cross-axis.
      middle: PropTypes.bool,

      // Sets custom padding.
      padding: PropTypes.string,

      // Displays the text from the right.
      right: PropTypes.bool,

      // Sets custom width.
      width: PropTypes.string
   };

   static componentTypes = {
      Container: undefined,
      HeaderContainer: undefined,
      BodyContainer: undefined
   };

   static _typeName = 'Cell';

   render() {
      const [ Container, Header, Body ] = utils.resolveComponents(Cell, this.props);
      const { header, center, middle, padding, right, children, borders, width, style, css, ...props } = this.props;

      const reservedTypes = [ 'header' ];
      const [ sections, body ] = utils.filterChildren(
         children,
         child => child && reservedTypes.some(x => x === child.type)
      );
      const _header = header || sections.filter(section => section.type === 'header').shift();
      const headerCss = body ? '' : 'border-bottom: none';

      return (
         <Container borders={borders} width={width} style={style} css={css}>
            {_header ? (
               <Header padding={padding} center={center} right={right} middle={middle} css={headerCss}>
                  {_header}
               </Header>
            ) : null}
            {body ? (
               <Body padding={padding} center={center} right={right} middle={middle}>
                  {body}
               </Body>
            ) : null}
         </Container>
      );
   }
}

let cellComponent = createWebComponent(Cell, 'd-cell');
cellComponent.prototype.isContainer = true;
