import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { TextField } from './TextField';
import Element from '../Element';
import * as utils from '../utils';

export class TextAreaField extends Element {

   static propTypes = Object.assign({
      rows: PropTypes.number,
   }, TextField.propTypes);

   static componentTypes = {
      InputComponent: undefined
   }

   render() {
      const [Input] = utils.resolveComponents(TextAreaField, this.props);

      const { attrs } = this.vmInput.props;
      let { rows, ...props } = this.props;
      rows = rows || attrs.rows || null;
      
      return <TextField inputComponent={Input} rows={rows} {...props} />
   }
}