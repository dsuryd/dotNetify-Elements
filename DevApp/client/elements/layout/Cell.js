import React from 'react';
import { PropTypes } from 'prop-types';
import * as utils from '../utils';

export class Cell extends React.Component {

   static propTypes = {
      borders: PropTypes.string
  }

   static componentTypes = {
      Container: undefined,
      HeaderContainer: undefined,
      BodyContainer: undefined,
   }

   render() {
      const [Container, Header, Body] = utils.resolveComponents(Cell, this.props);
      const { header, children, borders, ...props } = this.props;
      return (
         <Container borders={borders}>
            {header ? <Header>{header}</Header> : null}
            <Body>{children}</Body>
         </Container>
      );
   }
}  
