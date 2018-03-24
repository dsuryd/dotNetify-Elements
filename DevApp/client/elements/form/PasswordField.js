import React from 'react';
import { TextField } from './TextField';

export const PasswordField = props => <TextField type="password" {...props} />;

PasswordField.propTypes = Object.assign({}, TextField.propTypes);
