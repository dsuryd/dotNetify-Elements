import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

export class Alert extends React.Component {

   static contextTypes = ContextTypes;

   static componentTypes = {
      AlertComponent: undefined
   }

   constructor(props) {
      super(props);
   }

   get vmInput() {
      return utils.getVMInput(this);
   }

   render() {
      const [_Alert] = utils.resolveComponents(Alert, this.props);
      const { children, ...props } = utils.mapStyle(this.props);
      const { id, value, attrs } = this.vmInput.props;

      const noVmPropValue = id && !value;
      return noVmPropValue ? null : <_Alert id={id} {...props}>{utils.markdown(value) || children}</_Alert>;
   }
}  
