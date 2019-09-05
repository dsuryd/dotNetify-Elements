import React from 'react';
import PropTypes from 'prop-types';
import InputElement from '../core/InputElement';
import { Field, validationKeyPrefix } from '../structure/Field';
import { Label } from '../display/Label';

const PlainTextComponent = props => <span {...props} />;

export class DropdownList extends InputElement {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string,

      // Enables the field.
      enable: PropTypes.bool,

      // Displays the label text horizontally to the left of the field.
      horizontal: PropTypes.bool,

      // Text or component for the field's label.
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Replaces the input field with plain text.
      plainText: PropTypes.bool,

      // Text or component to display before the field.
      prefix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Text or component to display after the field.
      suffix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Occurs when the value changes.
      onChange: PropTypes.func
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
      this.state = { ...this.state, validationMessages: [] };
   }

   componentDidMount() {
      this.unsubOnValidated = this.vmProperty.onValidated(result =>
         this.setState({
            valid: result.valid ? null : false,
            validationMessages: result.messages
         })
      );

      // If "required" validation is specified, add a custom validator to validate against an empty selection.
      if (this.vmProperty.validator && this.vmProperty.validator.validations) {
         const requiredValidation = this.vmProperty.validator.validations.find(x => x.type === 'Required');
         const emptySelection = (this.attrs.options || []).find(x => !x.Value);

         if (requiredValidation && emptySelection) {
            this.vmProperty.addValidation({
               validate: val => val != emptySelection.Key,
               message: requiredValidation.message,
               category: requiredValidation.category
            });
         }
      }
   }

   componentWillUnmount() {
      this.unsubOnValidated();
   }

   handleChange = event => {
      let value = event.target.value;
      this.dispatch(value);
   };

   render() {
      const [ Container, Input, InputGroup, ValidationMessage, PlainText ] = this.resolveComponents(DropdownList);
      let {
         fullId,
         label,
         placeholder,
         prefix,
         suffix,
         plainText,
         options,
         horizontal,
         enable,
         style,
         css,
         tabIndex
      } = this.attrs;

      options = options || [];
      const listOptions = options.map(opt => (
         <option key={opt.Key} value={opt.Key}>
            {opt.Value || placeholder}
         </option>
      ));
      let value = this.value;
      if (!this.value) {
         let defaultOption = options.filter(x => !x.Value).shift();
         if (!defaultOption) options.shift();
         value = defaultOption ? defaultOption.Key : '';
      }

      const disabled = enable === false;
      const selected = options.filter(opt => opt.Key == this.value).shift();
      const plainTextValue = selected ? selected.Value : '';
      const validationMessages = this.props.validationMessages || this.state.validationMessages;

      return (
         <Container
            id={fullId}
            label={label}
            horizontal={horizontal}
            plainText={plainText}
            style={style}
            css={css}
            tabIndex={tabIndex}
         >
            {plainText ? (
               <PlainText>{plainTextValue}</PlainText>
            ) : (
               <InputGroup prefix={prefix} suffix={suffix}>
                  <Input
                     ref={this.inputRef}
                     id={fullId}
                     type="select"
                     valid={this.state.valid}
                     value={value}
                     prefix={prefix}
                     suffix={suffix}
                     disabled={disabled}
                     onChange={this.handleChange}
                  >
                     {listOptions}
                  </Input>
               </InputGroup>
            )}
            {validationMessages.map((message, idx) => (
               <ValidationMessage key={validationKeyPrefix + idx}>{message}</ValidationMessage>
            ))}
         </Container>
      );
   }
}
