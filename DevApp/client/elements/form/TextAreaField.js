import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import { TextField } from './TextField';
import * as utils from '../utils';

export class TextAreaField extends React.Component {

   static contextTypes = ContextTypes;

   static propTypes = Object.assign({
      rows: PropTypes.number,
   }, TextField.propTypes);

   static componentTypes = {
      InputComponent: undefined
   }

   get vmInput() {
      return utils.getVMInput(this);
  }

   render() {
      const [Input] = utils.resolveComponents(TextAreaField, this.props);

      const { attrs } = this.vmInput.props;
      let { rows, ...props } = this.props;
      rows = attrs.rows || rows;
      
      return <TextField inputComponent={Input} rows={rows} {...props} />
   }
}