import React from 'react';
import styled from 'styled-components';
import { Field } from '../structure/Field';
import { RadioGroup } from './RadioGroup';
import * as utils from '../utils';

export class RadioToggle extends React.Component {
   static propTypes = {
      ...RadioGroup.propTypes
   };

   static componentTypes = {
      Container: Field,
      GroupContainer: undefined,
      ToggleContainer: undefined,
      LabelComponent: undefined,
      InputComponent: undefined,
      PlainTextComponent: RadioGroup.componentTypes.PlainTextComponent
   };

   render() {
      const [ Container, GroupContainer, ToggleContainer, Label, Input, PlainText ] = utils.resolveComponents(RadioToggle, this.props);
      return (
         <RadioGroup
            container={Container}
            groupContainer={GroupContainer}
            radioContainer={ToggleContainer}
            labelComponent={Label}
            inputComponent={Input}
            plainTextComponent={PlainText}
            {...this.props}
         />
      );
   }
}
