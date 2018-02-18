import React from 'react';
import styled from 'styled-components';
import { FieldPanel } from '../layout/FieldPanel';
import { RadioGroup } from './RadioGroup';
import * as utils from '../utils';

export class RadioToggle extends React.Component {

   static propTypes = Object.assign({}, RadioGroup.propTypes);

   static componentTypes = {
      Container: FieldPanel,
      RadioGroupContainer: undefined,
      RadioContainer: undefined,
      RadioLabelComponent: undefined,
      InputComponent: undefined
   }

   render() {
      const [Container, RadioGroupContainer, RadioContainer, RadioLabel, Input] = utils.resolveComponents(RadioToggle, this.props);
      return <RadioGroup
         container={Container}
         radioGroupContainer={RadioGroupContainer}
         radioContainer={RadioContainer}
         radioLabelComponent={RadioLabel}
         inputComponent={Input}
         {...this.props}
      />
   }
}

