import React from 'react';
import { TextField } from './TextField';

export class PasswordField extends React.Component {
   static propTypes = { ...TextField.propTypes };
   static componentTypes = { ...TextField.componentTypes };

   render() {
      return <TextField type="password" {...this.props} />;
   }
}
