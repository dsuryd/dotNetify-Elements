import React from 'react';
import { PropTypes } from 'prop-types';
import { Field } from '../structure/Field';
import { Label } from '../display/Label';
import { InputElement } from '../core/Element';

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
      Container: Field,
      InputComponent: undefined,
      InputGroupComponent: undefined,
      ValidationMessageComponent: Label,
      PlainTextComponent
   };

   constructor(props) {
      super(props);
      this.state = { validationMessages: [] };
   }

   componentDidMount() {
      this.vmProperty.onValidated(result =>
         this.setState({
            valid: result.valid ? null : false,
            validationMessages: result.messages
         })
      );
   }

   handleChange = event => {
      let value = event.target.value;
      this.dispatch(value);
   };

   render() {
      const [ Container, Input, InputGroup, ValidationMessage, PlainText ] = this.resolveComponents(DropdownList);
      let { fullId, label, prefix, suffix, plainText, options, horizontal, disable, style, ...props } = this.attrs;

      options = options || [];
      const listOptions = options.map(opt => (
         <option key={opt.Key} value={opt.Key}>
            {opt.Value}
         </option>
      ));
      const selected = options.filter(opt => opt.Key == this.value).shift();
      const plainTextValue = selected ? selected.Value : '';

      return (
         <Container id={fullId} label={label} horizontal={horizontal} plainText={plainText} style={style}>
            {plainText ? (
               <PlainText>{plainTextValue}</PlainText>
            ) : (
               <InputGroup prefix={prefix} suffix={suffix}>
                  <Input
                     id={fullId}
                     type="select"
                     valid={this.state.valid}
                     value={this.value}
                     prefix={prefix}
                     suffix={suffix}
                     disabled={disable}
                     onChange={this.handleChange}
                  >
                     {listOptions}
                  </Input>
               </InputGroup>
            )}
            {this.state.validationMessages.map((message, idx) => <ValidationMessage key={'validationMsg' + idx}>{message}</ValidationMessage>)}
         </Container>
      );
   }
}
