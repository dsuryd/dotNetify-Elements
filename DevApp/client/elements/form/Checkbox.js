import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../core/VMContext';
import { InputElement } from '../core/Element';

export class Checkbox extends InputElement {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Enables the field.
      enable: PropTypes.bool,

      // Text or component for the field's label.
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Replaces the input field with plain text.
      plainText: PropTypes.bool
   };

   static componentTypes = {
      Container: undefined,
      LabelComponent: undefined,
      InputComponent: undefined,
      PlainTextComponent: undefined
   };

   handleChange = event => this.dispatch(event.target.checked);

   render() {
      const [ Container, Label, Input, PlainText ] = this.resolveComponents(Checkbox);
      const { fullId, label, plainText, enable, style } = this.attrs;
      const checked = !!this.value;
      const disabled = enable === false;

      return (
         <Container id={fullId} checked={checked} style={style}>
            {plainText ? (
               <PlainText checked={checked}>{label}</PlainText>
            ) : (
               <Label>
                  <Input type="checkbox" name={fullId} checked={checked} onChange={this.handleChange} disabled={disabled} />
                  {label}
               </Label>
            )}
         </Container>
      );
   }
}
