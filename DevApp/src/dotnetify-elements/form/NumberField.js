import React from 'react';
import { TextField } from './TextField';
import createWebComponent from '../utils/web-component';

export const NumberField = props => <TextField type="number" {...props} />;

NumberField.propTypes = { ...TextField.propTypes };
NumberField.componentTypes = { ...TextField.componentTypes };

createWebComponent(NumberField, 'd-number-field');
