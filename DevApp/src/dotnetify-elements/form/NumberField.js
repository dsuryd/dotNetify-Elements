import React from 'react';
import { TextField } from './TextField';
import createWebComponent from '../utils/web-component';

export class NumberField extends React.Component {
   static propTypes = { ...TextField.propTypes };
   static componentTypes = { ...TextField.componentTypes };

   render() {
      return <TextField type="number" {...this.props} />;
   }
}

createWebComponent(NumberField, 'd-number-field');
