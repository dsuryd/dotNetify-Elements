import React from 'react';
import { PropTypes } from 'prop-types';
import Element from '../core/Element';
import * as utils from '../utils';

export class Alert extends Element {
   static propTypes = {
      id: PropTypes.string,
      onShow: PropTypes.func
   };

   static componentTypes = {
      AlertComponent: undefined
   };

   render() {
      const [ _Alert ] = this.resolveComponents(Alert);
      const { fullId, children, onShow, ...props } = this.attrs;

      const show = !fullId || this.value ? true : false;
      onShow && onShow(show);

      return show ? (
         <_Alert id={fullId} {...props}>
            {utils.markdown(this.value) || children}
         </_Alert>
      ) : null;
   }
}
