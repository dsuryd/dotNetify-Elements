import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { Field } from '../structure/Field';
import { InputElement } from '../core/Element';
import * as utils from '../utils';

const GroupContainer = styled.section`${props => props.theme.Radio.GroupContainer};`;

const PlainTextComponent = props => <span {...props} />;

export class RadioGroup extends InputElement {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Enables the field.
      enable: PropTypes.bool,

      // Text or component for the field's label.
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Displays the label text horizontally to the left of the field.
      horizontal: PropTypes.bool,

      // Replaces the input field with plain text.
      plainText: PropTypes.bool
   };

   static componentTypes = {
      Container: Field,
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
      const { fullId, label, options, plainText, right, horizontal, enable, style, css, isToggle } = this.attrs;

      const disabled = enable === false;
      const radioOptions = (options || []).map(opt => utils.toCamelCase(opt));
      const radio = radioOptions.map((opt, idx) => (
         <RadioContainer key={opt.key} id={fullId} checked={opt.key == this.value}>
            {isToggle ? (
               <Label htmlFor={`${fullId}__input${idx}`}>
                  <Input
                     type="radio"
                     name={fullId}
                     id={`${fullId}__input${idx}`}
                     value={opt.key}
                     disabled={disabled}
                     checked={opt.key == this.value}
                     onChange={this.handleChange}
                  />
                  {opt.value}
               </Label>
            ) : (
               <React.Fragment>
                  <Input
                     type="radio"
                     name={fullId}
                     id={`${fullId}__input${idx}`}
                     value={opt.key}
                     disabled={disabled}
                     checked={opt.key == this.value}
                     onChange={this.handleChange}
                  />
                  <Label htmlFor={`${fullId}__input${idx}`}>{opt.value}</Label>
               </React.Fragment>
            )}
         </RadioContainer>
      ));

      const selected = radioOptions.filter(opt => opt.key == this.value).shift();
      const plainTextValue = selected ? selected.value : '';

      return (
         <Container id={fullId} label={label} horizontal={horizontal} right={right} plainText={plainText} style={style} css={css}>
            {plainText ? <PlainText>{plainTextValue}</PlainText> : <GroupContainer>{radio}</GroupContainer>}
         </Container>
      );
   }
}
