import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from './VMContext';
import * as utils from './utils';

export default class Element extends React.Component {

   static contextTypes = ContextTypes;

   static propTypes = {
      id: PropTypes.string.isRequired
   }

   get vmInput() { return utils.getVMInput(this); }
   get vmProperty() { return utils.getVMProperty(this); }

   render() {
      return this.vmProperty.value;
   }
}  