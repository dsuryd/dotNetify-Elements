import React from 'react';
import { PropTypes } from 'prop-types';
import * as utils from '../utils';

export class Card extends React.Component {

   static componentTypes = {
      Container: undefined,
      HeaderContainer: undefined,
      BodyContainer: undefined,
   }

   render() {
      const [Container, Header, Body] = utils.resolveComponents(Card, this.props);
      const { header, children, ...props } = this.props;
      return (
         <Container>
            {header ? <Header>{header}</Header> : null}
            <Body>{children}</Body>
         </Container>
      );
   }
}  
