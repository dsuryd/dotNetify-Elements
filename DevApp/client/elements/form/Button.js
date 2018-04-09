import React from 'react';
import { PropTypes } from 'prop-types';
import { FormContextTypes } from './Form';
import * as utils from '../utils';

export class Button extends React.Component {
   static contextTypes = FormContextTypes;

   static propTypes = {
      label: PropTypes.string,
      submit: PropTypes.bool,
      cancel: PropTypes.bool,
      hide: PropTypes.bool,
      disable: PropTypes.bool
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
      const { label, submit, hide, disable, onClick, children, ...props } = this.props;
      const _disable = submit ? this.disable : disable;

      return !hide ? (
         <_Button type={submit ? 'submit' : 'button'} onClick={this.handleClick} disabled={_disable} {...props}>
            {label || children}
         </_Button>
      ) : null;
   }
}
