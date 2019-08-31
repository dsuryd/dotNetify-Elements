import React from 'react';
import PropTypes from 'prop-types';
import Element from '../core/Element';
import markdown from '../utils/markdown';

export class Alert extends Element {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string,

      // Alert text.
      text: PropTypes.string,

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

      const rawText = this.props.text || this.value;
      const show = (!!fullId && !!children) || rawText != null;
      onShow && onShow(show);

      return (
         show && (
            <_Alert id={fullId} {...props}>
               {rawText && markdown(rawText)}
               {children}
            </_Alert>
         )
      );
   }
}
