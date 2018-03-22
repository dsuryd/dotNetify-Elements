import React from 'react';
import { PropTypes } from 'prop-types';
import Element from '../Element';

export class Alert extends Element {

   static propTypes = {
      id: PropTypes.string,
      onShow: PropTypes.func
   }
 
   static componentTypes = {
      AlertComponent: undefined
   }

   render() {
      const [_Alert] = this.resolveComponents(Alert);
      const { children, onShow, ...props } = this.nonAttrProps;

      const show = (!this.id || this.value) ? true : false;
      onShow && onShow(show);

      return show ? <_Alert id={this.id} {...props}>{utils.markdown(this.value) || children}</_Alert> : null;
   }
}  
