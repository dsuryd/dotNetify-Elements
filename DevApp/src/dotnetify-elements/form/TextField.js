import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, validationKeyPrefix } from '../structure/Field';
import { Label } from '../display/Label';
import { InputElement } from '../core/Element';

const PlainTextComponent = props => (props.type === 'password' ? '' : <span {...props} />);

export class TextField extends InputElement {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Enables the field.
      enable: PropTypes.bool,

      // Text or component for the field's label.
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Displays the label text horizontally to the left of the field.
      horizontal: PropTypes.bool,

      // Max input length.
      maxLength: PropTypes.number,

      // Placeholder text to display when the field is empty.
      placeholder: PropTypes.string,

      // Replaces the input field with plain text.
      plainText: PropTypes.bool,

      // Text or component to display before the field.
      prefix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Text or component to display after the field.
      suffix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Custom validation functions.
      validation: PropTypes.oneOfType([ PropTypes.array, PropTypes.shape({ validate: PropTypes.func, message: PropTypes.string }) ])
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

   handleChange = value => {
      this.changed = true;
      this.value = typeof this.vmProperty.domValue != 'undefined' ? this.vmProperty.domValue : value;
   };

   handleKeyPress = event => {
      if (event.key == 'Enter') this.handleBlur();
      if (this.attrs.type == 'number' && (event.key == '.' || event.key == ',')) event.preventDefault();
   };

   render() {
      const [ Container, Input, InputGroup, ValidationMessage, PlainText ] = this.resolveComponents(TextField);
      const { fullId, label, placeholder, prefix, suffix, maxLength, plainText, horizontal, enable, onChange, type, css, style, ...props } = this.attrs;

      let handleChange = onChange ? e => onChange(e.target.value) : e => this.handleChange(e.target.value);
      const handleBlur = onChange ? null : this.handleBlur;

      const disabled = enable === false;
      const plainTextValue = `${prefix || ''}${this.value || ''}${suffix || ''}`;
      const validationMessages = this.props.validationMessages || this.state.validationMessages;

      return (
         <Container id={fullId} label={label} horizontal={horizontal} plainText={plainText} style={style} css={css}>
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
                     disabled={disabled}
                     onKeyPress={this.handleKeyPress}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     innerRef={elem => (this.vmProperty.dom = elem)}
                     {...props}
                  />
               </InputGroup>
            )}
            {validationMessages.map((message, idx) => <ValidationMessage key={validationKeyPrefix + idx}>{message}</ValidationMessage>)}
         </Container>
      );
   }
}
