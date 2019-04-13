import React from 'react';
import { TextField } from './TextField';
import createWebComponent from '../utils/web-component';

export class PasswordField extends React.Component {
   static propTypes = { ...TextField.propTypes };
   static componentTypes = { ...TextField.componentTypes };

   render() {
      return <TextField type="password" {...this.props} />;
   }
}

createWebComponent(PasswordField, 'd-password-field');
