import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import Element from '../Element';
import * as utils from '../utils';

const GroupContainer = styled.section`
    ${props => props.theme.Radio.GroupContainer}
`;

const PlainTextComponent = props => props.children;

export class RadioGroup extends Element {

   static propTypes = {
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      horizontal: PropTypes.bool,
      plainText: PropTypes.bool
   }

   static componentTypes = {
      Container: FieldPanel,
      GroupContainer,
      RadioContainer: undefined,
      LabelComponent: undefined,
      InputComponent: undefined,
      PlainTextComponent
   }

   handleChange = (event) => {
      let value = event.target.value;
      value = this.valueType == "number" ? parseInt(value) : value;
      this.vmInput.dispatch(value);
   }
   render() {
      const [Container, GroupContainer, RadioContainer, Label, Input, PlainText] = this.resolveComponents(RadioGroup);
      this.valueType = typeof this.value;

      const { right, horizontal } = this.nonAttrProps;
      const { label, options, plainText } = this.attrs;
      const radioOptions = (options || []).map(opt => utils.toCamelCase(opt));

      const radio = radioOptions.map(opt => (
         <RadioContainer key={opt.key} id={this.id} checked={opt.key == this.value}>
            <Label>
               <Input type="radio" name={this.id} value={opt.key} checked={opt.key == this.value} onChange={this.handleChange} />
               {opt.value}
            </Label>
         </RadioContainer>
      ));

      const selected = radioOptions.filter(opt => opt.key == this.value).shift();
      const plainTextValue = selected ? selected.value : "";

      return (
         <Container id={this.id} label={label} horizontal={horizontal} right={right} plainText={plainText}>
            {plainText ? <PlainText>{plainTextValue}</PlainText> : <GroupContainer>{radio}</GroupContainer>}
         </Container>
      );
   }
}