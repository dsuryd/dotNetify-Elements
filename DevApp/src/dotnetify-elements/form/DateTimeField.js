import React from 'react';
import PropTypes from 'prop-types';
import InputElement from '../core/InputElement';
import { Field, validationKeyPrefix } from '../structure/Field';
import { Label } from '../display/Label';
import moment from 'moment';

const PlainTextComponent = props => <span {...props} />;

export class DateTimeField extends InputElement {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Enables the field.
      enable: PropTypes.bool,

      // Text or component for the field's label.
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Displays the label text horizontally to the left of the field.
      horizontal: PropTypes.bool,

      // Placeholder text to display when the field is empty.
      placeholder: PropTypes.string,

      // Replaces the input field with plain text.
      plainText: PropTypes.bool,

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
      this.state = { changed: false, validationMessages: [] };
   }

   componentDidMount() {
      this.vmProperty.onValidated(result =>
         this.setState({
            valid: result.valid ? null : false,
            validationMessages: result.messages
         })
      );

      if (this.props.validation) this.vmProperty.addValidation(this.props.validation);
   }

   handleChange = value => {
      this.setState({ changed: true });
      this.value = value ? moment(value).format() : null;
   };

   handleBlur = _ => {
      this.state.changed && this.dispatch();
      this.setState({ changed: false });
   };

   render() {
      const [ Container, Input, InputGroup, ValidationMessage, PlainText ] = this.resolveComponents(DateTimeField);
      const { fullId, label, placeholder, plainText, prefix, suffix, min, max, format, horizontal, enable, style, css, validation, ...props } = this.attrs;

      let dateValue = this.value ? new Date(this.value) : null;
      dateValue = dateValue && dateValue.getFullYear() === 0 ? null : dateValue;

      const plainTextValue = dateValue
         ? `${props.time === false ? moment(dateValue).format('L') : props.date === false ? moment(dateValue).format('LT') : moment(dateValue).format('LLL')}`
         : '';
      const validationMessages = this.props.validationMessages || this.state.validationMessages;
      const disabled = enable === false;

      return (
         <Container id={fullId} label={label} horizontal={horizontal} plainText={plainText} style={style} css={css}>
            {plainText ? (
               <PlainText>{plainTextValue}</PlainText>
            ) : (
               <InputGroup prefix={prefix} suffix={suffix}>
                  <Input
                     valid={this.state.valid}
                     id={fullId}
                     value={dateValue}
                     format={format}
                     placeholder={placeholder}
                     min={new Date(min)}
                     max={new Date(max)}
                     prefix={prefix}
                     suffix={suffix}
                     disabled={disabled}
                     onChange={this.handleChange}
                     onBlur={this.handleBlur}
                     {...props}
                  />
               </InputGroup>
            )}
            {validationMessages.map((message, idx) => <ValidationMessage key={validationKeyPrefix + idx}>{message}</ValidationMessage>)}
         </Container>
      );
   }
}

export const DateField = props => <DateTimeField time={false} {...props} />;
DateField.propTypes = { ...DateTimeField.propTypes };
DateField.componentTypes = { ...DateTimeField.componentTypes };

export const TimeField = props => <DateTimeField date={false} {...props} />;
TimeField.propTypes = { ...DateTimeField.propTypes };
TimeField.componentTypes = { ...DateTimeField.componentTypes };
