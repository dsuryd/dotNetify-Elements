import React from 'react';
import { TextField } from './TextField';

export const PasswordField = props => <TextField type="password" {...props} />;

PasswordField.propTypes = { ...TextField.propTypes };
PasswordField.componentTypes = { ...TextField.componentTypes };
