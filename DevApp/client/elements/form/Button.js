import React from 'react';
import { PropTypes } from 'prop-types';
import { FormContextTypes } from './Form';
import Element from '../core/Element';
import * as utils from '../utils';

export class Button extends Element {
   static contextTypes = FormContextTypes;

   static propTypes = {
      // Associates the button with form cancel action.
      cancel: PropTypes.bool,

      // Disables the button.
      disable: PropTypes.bool,
      
      // Controls the button's visibility.
      if: PropTypes.bool,

      // Text or component for the button's label.
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Associates the button with form submit action.
      submit: PropTypes.bool
   };

   static componentTypes = {
      ButtonComponent: undefined
   };

   get disable() {
      return utils.ifBoolElse(this.props.disable, this.context.formContext && !this.context.formContext.changed);
   }

   handleClick = _ => {
      const { id, submit, cancel, disable, onClick } = this.props;
      if ((submit || cancel) && this.context.formContext) {
         if (submit) this.context.formContext.submit(id).then(canSubmit => canSubmit && onClick && onClick());
         else if (cancel) {
            this.context.formContext.cancel();
            onClick && onClick();
         }
      }
      else onClick && onClick();
   };

   render() {
      const [ _Button ] = utils.resolveComponents(Button, this.props);
      const { label, submit, disable, onClick, children, ...props } = this.attrs;
      const _disable = submit ? this.disable : disable;

      if (this.props.if === false) return null;
      return (
         <_Button type={submit ? 'submit' : 'button'} onClick={this.handleClick} disabled={_disable} {...props}>
            {label || children}
         </_Button>
      );
   }
}
