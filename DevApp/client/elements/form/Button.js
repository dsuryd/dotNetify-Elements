import React from 'react';
import { PropTypes } from 'prop-types';
import { FormContextTypes } from './Form';
import * as utils from '../utils';

export class Button extends React.Component {
   static contextTypes = FormContextTypes;

   static propTypes = {
      submit: PropTypes.bool,
      cancel: PropTypes.bool,
      hide: PropTypes.bool,
      disable: PropTypes.bool
   };
   static componentTypes = {
      ButtonComponent: undefined
   };

   get disable() {
      return utils.bool(this.props.disable, this.context.formContext && !this.context.formContext.changed);
   }

   handleClick = _ => {
      const { id, submit, cancel, disable, onClick } = this.props;
      if ((submit || cancel) && this.context.formContext) {
         submit && this.context.formContext.submit(id);
         cancel && this.context.formContext.cancel();
      }
      onClick && onClick();
   };

   render() {
      const [ _Button ] = utils.resolveComponents(Button, this.props);
      const { submit, cancel, hide, disable, onClick, ...props } = this.props;
      const _disable = submit || cancel ? this.disable : disable;

      return !hide ? <_Button onClick={this.handleClick} disabled={_disable} {...props} /> : null;
   }
}
