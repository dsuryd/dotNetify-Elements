import React from 'react';
import PropTypes from 'prop-types';
import InputElement from '../core/InputElement';
import { FormContextTypes } from './Form';
import { Label } from '../display/Label';
import * as utils from '../utils';
import createWebComponent from '../utils/web-component';

export class Button extends InputElement {
   static contextTypes = FormContextTypes;

   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string,

      // Associates the button with form cancel action.
      cancel: PropTypes.bool,

      // Enables the button.
      enable: PropTypes.bool,

      // Icon to the left.
      icon: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

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
      submit: PropTypes.bool,

      // Occurs when the button is clicked.
      onClick: PropTypes.func
   };

   static componentTypes = {
      ButtonComponent: undefined,
      LabelComponent: Label
   };

   get shouldDisableSubmit() {
      if (this.props.enable != null) return this.props.enable === false;
      return this.formContext && !this.formContext.isChanged();
   }

   handleClick = _ => {
      const { id, submit, cancel } = this.props;
      let onClick = this.props.onClick;
      if (!onClick) onClick = () => null;

      // If button is associated with a form action, invoke it.
      if ((submit || cancel) && this.formContext) {
         if (submit) this.formContext.submit(id).then(canSubmit => canSubmit && onClick());
         else if (cancel) {
            this.formContext.cancel();
            onClick();
         }
      }
      else {
         // Dispatch to server only if the 'onClick' returns a value or null.
         const data = onClick();
         if (id && typeof data !== 'undefined') this.dispatch(data, true);
      }
   };

   render() {
      const [ _Button, Label ] = utils.resolveComponents(Button, this.props);
      const { label, icon, submit, show, enable, onClick, children, style, stretch, css, ...props } = this.attrs;
      const disabled = submit ? this.shouldDisableSubmit : this.props.enable === false;

      const _label = typeof label == 'string' ? <Label icon={icon}>{label}</Label> : label;

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

createWebComponent(Button, 'd-button');
