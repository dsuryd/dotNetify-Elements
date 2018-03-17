import React from 'react';
import { FormContextTypes } from './Form';
import { Button } from './Button';
import * as utils from '../utils';

export class SubmitButton extends React.Component {

   static contextTypes = FormContextTypes;

   handleClick = _ => {
      const { id, onClick } = this.props;
      this.context.formContext && this.context.formContext.submit(id);
      onClick && onClick();
   }

   render() {
      let { disabled, ...props } = this.props;
      disabled = utils.bool(this.props.disabled, (this.context.formContext && !this.context.formContext.changed));
      return <Button onClick={this.handleClick} disabled={disabled} {...props} />
   }
}  
