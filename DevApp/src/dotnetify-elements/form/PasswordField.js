import React from 'react';
import { TextField } from './TextField';
import createWebComponent from '../utils/web-component';

export const PasswordField = props => <TextField type="password" {...props} />;

PasswordField.propTypes = { ...TextField.propTypes };
PasswordField.componentTypes = { ...TextField.componentTypes };

createWebComponent(PasswordField, 'd-password-field');
