import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { TextField } from './TextField';
import { InputElement } from '../Element';

export class TextAreaField extends InputElement {
   static propTypes = Object.assign(
      {
         rows: PropTypes.number
      },
      TextField.propTypes
   );

   static componentTypes = {
      InputComponent: undefined
   };

   render() {
      const [ Input ] = this.resolveComponents(TextAreaField);
      const { rows, ...props } = this.attrs;

      return <TextField inputComponent={Input} rows={rows} {...props} />;
   }
}
