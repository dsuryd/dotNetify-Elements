import React from 'react';
import { PropTypes } from 'prop-types';
import { FormContextTypes } from './Form';
import * as utils from '../utils';

export class Button extends React.Component {

   static contextTypes = FormContextTypes;

   static propTypes = {
      submit: PropTypes.bool,
      cancel: PropTypes.bool,
      visible: PropTypes.bool,      
      disabled: PropTypes.bool,
   }

   static defaultProps = {
      visible: true
   }

   static componentTypes = {
      ButtonComponent: undefined
   }

   get disabled() { return utils.bool(this.props.disabled, (this.context.formContext && !this.context.formContext.changed)); }

   handleClick = _ => {
      const { id, submit, cancel, onClick } = this.props;
      if ((submit || cancel) && this.context.formContext) {
         submit && this.context.formContext.submit(id);
         cancel && this.context.formContext.cancel();
      }
      onClick && onClick();
   }

   render() {
      const [_Button] = utils.resolveComponents(Button, this.props);
      const { submit, cancel, visible, disabled, onClick, ...props } = this.props;
      const _disabled = submit || cancel ? this.disabled : disabled;

      return visible ? <_Button onClick={this.handleClick} disabled={_disabled} {...props} /> : null;
   }
}  
