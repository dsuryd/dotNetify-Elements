import React from 'react';
import PropTypes from 'prop-types';
import InputElement from '../core/InputElement';
import { Field, validationKeyPrefix } from '../structure/Field';
import { Label } from '../display/Label';

const PlainTextComponent = props => <span {...props}>{React.Children.toArray(props.children).join(', ')}</span>;

export class MultiselectList extends InputElement {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Enables the field.
      enable: PropTypes.bool,

      // Displays the label text horizontally to the left of the field.
      horizontal: PropTypes.bool,

      // Text or component for the field's label.
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Replaces the input field with plain text.
      plainText: PropTypes.bool,

      // Occurs when the value changes.
      onChange: PropTypes.func
   };

   static componentTypes = {
      Container: Field,
      InputComponent: undefined,
      TagComponent: undefined,
      ItemComponent: undefined,
      ListComponent: undefined,
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

      // If "required" validation is specified, add a custom validator to validate against an empty selection.
      if (this.vmProperty.validator && this.vmProperty.validator.validations) {
         const requiredValidation = this.vmProperty.validator.validations.filter(x => x.type === 'Required').shift();
         if (requiredValidation) {
            this.vmProperty.addValidation({
               validate: val => val && val.length > 0,
               message: requiredValidation.message,
               category: requiredValidation.category
            });
         }
      }
   }

   handleChange = value => this.dispatch(value.map(val => val.Key));

   render() {
      const [ Container, Input, Tag, Item, List, ValidationMessage, PlainText ] = this.resolveComponents(MultiselectList);
      const { fullId, label, plainText, options, horizontal, enable, style, css, ...props } = this.attrs;

      const disabled = enable === false;
      const values = this.value ? this.value.map(x => `${x}`) : [];
      const selected = (options || []).filter(opt => values.includes(opt.Key));
      const plainTextValue = selected.map(x => x.Value);
      const validationMessages = this.props.validationMessages || this.state.validationMessages;

      return (
         <Container id={fullId} label={label} horizontal={horizontal} plainText={plainText} style={style} css={css}>
            {plainText ? (
               <PlainText>{plainTextValue}</PlainText>
            ) : (
               <Input
                  valid={this.state.valid}
                  id={fullId}
                  value={values}
                  data={options}
                  valueField="Key"
                  textField="Value"
                  tagComponent={Tag}
                  itemComponent={Item}
                  listComponent={List}
                  disabled={disabled}
                  onChange={this.handleChange}
                  {...props}
               />
            )}
            {validationMessages.map((message, idx) => <ValidationMessage key={validationKeyPrefix + idx}>{message}</ValidationMessage>)}
         </Container>
      );
   }
}
