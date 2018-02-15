import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

export class Alert extends React.Component {

   static contextTypes = ContextTypes;

   static propTypes = {
      onShow: PropTypes.func
   }
 
   static componentTypes = {
      AlertComponent: undefined
   }

   constructor(props) {
      super(props);
   }

   get vmProperty() {
      return utils.getVMProperty(this);
   }

   render() {
      const [_Alert] = utils.resolveComponents(Alert, this.props);
      const { children, onShow, ...props } = this.props;
      const { id, value } = this.vmProperty.props;

      const show = (!id || value) ? true : false;
      this.props.onShow && this.props.onShow(show);

      return show ? <_Alert id={id} {...props}>{utils.markdown(value) || children}</_Alert> : null;
   }
}  
