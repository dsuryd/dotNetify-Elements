import React from 'react';
import PropTypes from 'prop-types';
import InputElement from '../core/InputElement';
import { FormContextTypes } from './Form';
import * as utils from '../utils';

export class Button extends InputElement {
   static contextTypes = FormContextTypes;

   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string,

      // Associates the button with form cancel action.
      cancel: PropTypes.bool,

      // Enables the button.
      enable: PropTypes.bool,

      // Text or component for the button's label.
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Negative color.
      negative: PropTypes.bool,

      // Positive color.
      positive: PropTypes.bool,

      // Primary color.
      primary: PropTypes.bool,

      // Secondary color.
      secondary: PropTypes.bool,

      // Shows the button.
      show: PropTypes.bool,

      // Fills the available space.
      stretch: PropTypes.bool,

      // Associates the button with form submit action.
      submit: PropTypes.bool
   };

   static componentTypes = {
      ButtonComponent: undefined
   };

   get shouldDisableSubmit() {
      return this.props.enable === false || (this.context.formContext && !this.context.formContext.changed);
   }

   handleClick = _ => {
      const { id, submit, cancel } = this.props;
      let onClick = this.props.onClick;
      if (!onClick) onClick = () => null;

      // If button is associated with a form action, invoke it.
      if ((submit || cancel) && this.context.formContext) {
         if (submit) this.context.formContext.submit(id).then(canSubmit => canSubmit && onClick());
         else if (cancel) {
            this.context.formContext.cancel();
            onClick();
         }
      }
      else {
         const data = onClick();
         if (id && typeof data !== 'undefined') this.dispatch(data, true);
      }
   };

   render() {
      const [ _Button ] = utils.resolveComponents(Button, this.props);
      const { label, submit, show, enable, onClick, children, style, stretch, css, ...props } = this.attrs;
      const disabled = submit ? this.shouldDisableSubmit : this.props.enable === false;

      const _label = typeof label == 'string' ? <div style={{ padding: '1px 0' }}>{label}</div> : label;

      const handleKeyPress = event => (event.charCode == 13 ? this.handleClick() : null);

      if (show === false) return null;
      return (
         <_Button
            type={submit ? 'submit' : 'button'}
            style={style}
            css={css}
            stretch={stretch}
            disabled={disabled}
            onClick={this.handleClick}
            onKeyPress={handleKeyPress}
            {...props}
         >
            {_label || children}
         </_Button>
      );
   }
}
