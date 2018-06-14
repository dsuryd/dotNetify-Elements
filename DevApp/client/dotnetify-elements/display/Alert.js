import React from 'react';
import { PropTypes } from 'prop-types';
import Element from '../core/Element';
import * as utils from '../utils';

export class Alert extends Element {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string,

      // Danger color.
      danger: PropTypes.bool,

      // Info color.
      info: PropTypes.bool,

      // Success color.
      success: PropTypes.bool,

      // Warning color.
      warning: PropTypes.bool,

      // Occurs when the element becomes visible.
      onShow: PropTypes.func
   };

   static componentTypes = {
      AlertComponent: undefined
   };

   render() {
      const [ _Alert ] = this.resolveComponents(Alert);
      const { fullId, children, onShow, ...props } = this.attrs;

      const show = (!fullId && !!children) || !!this.value;
      onShow && onShow(show);

      return (
         show && (
            <_Alert id={fullId} {...props}>
               {this.value && utils.markdown(this.value)}
               {children}
            </_Alert>
         )
      );
   }
}
