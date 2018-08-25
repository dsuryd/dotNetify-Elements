import React from 'react';
import { PropTypes } from 'prop-types';
import { TextField } from './TextField';
import { InputElement } from '../core/Element';

export class TextAreaField extends InputElement {
   static propTypes = {
      ...TextField.propTypes,

      // Number of rows of the input area.
      rows: PropTypes.number
   };

   static componentTypes = {
      InputComponent: undefined,
      ...TextField.componentTypes
   };

   render() {
      const [ Input ] = this.resolveComponents(TextAreaField);
      const { rows, ...props } = this.attrs;

      return <TextField inputComponent={Input} rows={rows} {...props} />;
   }
}
