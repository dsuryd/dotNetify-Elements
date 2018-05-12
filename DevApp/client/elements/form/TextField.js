import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { Field } from '../structure/Field';
import { Label } from '../display/Label';
import { InputElement } from '../core/Element';

const PlainTextComponent = props => (props.type === 'password' ? '' : props.children);

export class TextField extends InputElement {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Label text of the field.
      label: PropTypes.string,

      // Placeholder text to display when the field is empty.
      placeholder: PropTypes.string,

      // Displays the label text horizontally to the left of the field.
      horizontal: PropTypes.bool,

      // Replaces the input field with plain text.
      plainText: PropTypes.bool,

      // Text or component to display before the field.
      prefix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Text or component to display after the field.
      suffix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Custom validation functions.
      validation: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),

      // Disables the field.
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
      this.changed = false;
   }

   componentDidMount() {
      this.vmProperty.onValidated(result => {
         this.setState({
            valid: result.valid ? null : false,
            validationMessages: result.messages
         });
      });

      if (this.props.validation) this.vmProperty.addValidation(this.props.validation);

      this.vmProperty.initMask();
   }

   componentDidUpdate() {
      this.vmProperty.initMask();
   }

   handleBlur = _ => {
      this.changed && this.dispatch();
      this.changed = false;
   };

   handleChange = _ => {
      this.changed = true;
      this.value = this.vmProperty.domValue;
   };

   handleKeyPress = event => {
      if (event.key == 'Enter') this.handleBlur();
      if (this.attrs.type == 'number' && (event.key == '.' || event.key == ',')) event.preventDefault();
   };

   render() {
      const [ Container, Input, InputGroup, ValidationMessage, PlainText ] = this.resolveComponents(TextField);
      const { fullId, label, placeholder, prefix, suffix, maxLength, plainText, horizontal, disable, type, ...props } = this.attrs;

      const plainTextValue = `${prefix || ''}${this.value || ''}${suffix || ''}`;

      return (
         <Container id={fullId} label={label} horizontal={horizontal} plainText={plainText}>
            {plainText ? (
               <PlainText type={type}>{plainTextValue}</PlainText>
            ) : (
               <InputGroup prefix={prefix} suffix={suffix}>
                  <Input
                     valid={this.state.valid}
                     id={fullId}
                     maxLength={maxLength}
                     type={type || 'text'}
                     placeholder={placeholder}
                     value={this.value || ''}
                     disabled={disable}
                     onKeyPress={this.handleKeyPress}
                     onChange={this.handleChange}
                     onBlur={this.handleBlur}
                     innerRef={elem => (this.vmProperty.dom = elem)}
                     {...props}
                  />
               </InputGroup>
            )}
            {this.state.validationMessages.map((message, idx) => <ValidationMessage key={'validationMsg' + idx}>{message}</ValidationMessage>)}
         </Container>
      );
   }
}
