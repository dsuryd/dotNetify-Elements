import React from 'react';
import styled from 'styled-components';
import { FieldPanel } from '../layout/FieldPanel';
import { RadioGroup } from './RadioGroup';
import * as utils from '../utils';

export class RadioToggle extends React.Component {

   static propTypes = Object.assign({}, RadioGroup.propTypes);

   static componentTypes = {
      Container: FieldPanel,
      GroupContainer: undefined,
      ToggleContainer: undefined,
      LabelComponent: undefined,
      InputComponent: undefined
   }

   render() {
      const [Container, GroupContainer, ToggleContainer, Label, Input] = utils.resolveComponents(RadioToggle, this.props);
      return <RadioGroup
         container={Container}
         groupContainer={GroupContainer}
         radioContainer={ToggleContainer}
         labelComponent={Label}
         inputComponent={Input}
         {...this.props}
      />
   }
}

