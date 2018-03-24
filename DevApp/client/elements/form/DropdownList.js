import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { InputElement } from '../Element';

const PlainTextComponent = props => props.children;

export class DropdownList extends InputElement {
   static propTypes = {
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      horizontal: PropTypes.bool,
      plainText: PropTypes.bool,
      prefix: PropTypes.any,
      suffix: PropTypes.any,
      disable: PropTypes.bool
   };

   static componentTypes = {
      Container: FieldPanel,
      InputComponent: undefined,
      InputGroupComponent: undefined,
      PlainTextComponent
   };

   handleChange = event => {
      let value = event.target.value;
      this.dispatch(value);
   };

   render() {
      const [ Container, Input, InputGroup, PlainText ] = this.resolveComponents(DropdownList);
      let { fullId, label, prefix, suffix, plainText, options, horizontal, disable, ...props } = this.attrs;

      const listOptions = (options || []).map(opt => (
         <option key={opt.Key} value={opt.Key}>
            {opt.Value}
         </option>
      ));
      const selected = options.filter(opt => opt.Key == this.value).shift();
      const plainTextValue = selected ? selected.Value : '';

      return (
         <Container id={fullId} label={label} horizontal={horizontal} plainText={plainText}>
            {plainText ? (
               <PlainText>{plainTextValue}</PlainText>
            ) : (
               <InputGroup prefix={prefix} suffix={suffix}>
                  <Input id={fullId} type="select" value={this.value} prefix={prefix} suffix={suffix} disabled={disable} onChange={this.handleChange}>
                     {listOptions}
                  </Input>
               </InputGroup>
            )}
         </Container>
      );
   }
}
