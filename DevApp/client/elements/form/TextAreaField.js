import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { TextField } from './TextField';
import Element from '../Element';

export class TextAreaField extends Element {

   static propTypes = Object.assign({
      rows: PropTypes.number,
   }, TextField.propTypes);

   static componentTypes = {
      InputComponent: undefined
   }

   render() {
      const [Input] = this.resolveComponents(TextAreaField);
      const { ...props } = this.nonAttrProps;
      const { rows } = this.attrs;
      
      return <TextField inputComponent={Input} rows={rows} {...props} />
   }
}