import React from 'react';
import { TextField } from './TextField';
import { ContextTypes } from '../VMContext';

export const NumberField = props => (
   <TextField type="number" {...props} />
);

NumberField.contextTypes = ContextTypes;
NumberField.propTypes = Object.assign({}, TextField.propTypes);
