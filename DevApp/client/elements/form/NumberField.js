import React from 'react';
import { TextField } from './TextField';

export const NumberField = props => (
   <TextField type="number" {...props} />
);

NumberField.propTypes = Object.assign({}, TextField.propTypes);
