import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../core/VMContext';
import { InputElement } from '../core/Element';

export class Checkbox extends InputElement {
   static propTypes = {
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      plainText: PropTypes.bool,
      disable: PropTypes.bool
   };

   static componentTypes = {
      Container: undefined,
      LabelComponent: undefined,
      InputComponent: undefined
   };

   handleChange = event => this.dispatch(event.target.checked);

   render() {
      const [ Container, Label, Input ] = this.resolveComponents(Checkbox);
      const { fullId, label, plainText, disable } = this.attrs;
      const checked = !!this.value;

      return (
         <Container id={fullId} checked={checked}>
            <Label>
               <Input type="checkbox" name={fullId} checked={checked} onChange={this.handleChange} disabled={plainText || disable} />
               {label}
            </Label>
         </Container>
      );
   }
}
