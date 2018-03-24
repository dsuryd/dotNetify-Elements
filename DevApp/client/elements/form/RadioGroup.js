import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { InputElement } from '../Element';
import * as utils from '../utils';

const GroupContainer = styled.section`${props => props.theme.Radio.GroupContainer};`;

const PlainTextComponent = props => props.children;

export class RadioGroup extends InputElement {
   static propTypes = {
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      horizontal: PropTypes.bool,
      plainText: PropTypes.bool,
      disable: PropTypes.bool
   };

   static componentTypes = {
      Container: FieldPanel,
      GroupContainer,
      RadioContainer: undefined,
      LabelComponent: undefined,
      InputComponent: undefined,
      PlainTextComponent
   };

   handleChange = event => {
      let value = event.target.value;
      this.dispatch(value);
   };
   render() {
      const [ Container, GroupContainer, RadioContainer, Label, Input, PlainText ] = this.resolveComponents(RadioGroup);
      const { fullId, label, options, plainText, right, horizontal, disable } = this.attrs;

      const radioOptions = (options || []).map(opt => utils.toCamelCase(opt));
      const radio = radioOptions.map(opt => (
         <RadioContainer key={opt.key} id={fullId} checked={opt.key == this.value}>
            <Label>
               <Input type="radio" name={fullId} value={opt.key} disabled={disable} checked={opt.key == this.value} onChange={this.handleChange} />
               {opt.value}
            </Label>
         </RadioContainer>
      ));

      const selected = radioOptions.filter(opt => opt.key == this.value).shift();
      const plainTextValue = selected ? selected.value : '';

      return (
         <Container id={fullId} label={label} horizontal={horizontal} right={right} plainText={plainText}>
            {plainText ? <PlainText>{plainTextValue}</PlainText> : <GroupContainer>{radio}</GroupContainer>}
         </Container>
      );
   }
}
