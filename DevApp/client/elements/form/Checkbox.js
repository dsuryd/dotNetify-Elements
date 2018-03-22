import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import { InputElement } from '../Element';

export class Checkbox extends InputElement {

   static propTypes = {
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      plainText: PropTypes.bool
   }

   static componentTypes = {
      Container: undefined,
      LabelComponent: undefined,
      InputComponent: undefined
   }

   handleChange = (event) => this.vmInput.dispatch(event.target.checked);

   render() {
      const [Container, Label, Input] = this.resolveComponents(Checkbox);
      const { label, plainText } = this.attrs;
      const checked = !!this.value;

      return (
         <Container id={this.id} checked={checked}>
            <Label>
               <Input type="checkbox" name={this.id} checked={checked} onChange={this.handleChange} disabled={plainText} />
               {label}
            </Label>
         </Container>
      )
   }
}