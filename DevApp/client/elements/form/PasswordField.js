import React from 'react';
import { TextField } from './TextField';
import { ContextTypes } from '../VMContext';

export const PasswordField = props => (
   <TextField type="password" {...props} />
);

PasswordField.contextTypes = ContextTypes;
PasswordField.propTypes = Object.assign({}, TextField.propTypes);