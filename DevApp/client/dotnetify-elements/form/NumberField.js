import React from 'react';
import { TextField } from './TextField';

export const NumberField = props => <TextField type="number" {...props} />;

NumberField.propTypes = { ...TextField.propTypes };
NumberField.componentTypes = { ...TextField.componentTypes };
