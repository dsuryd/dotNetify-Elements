import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { Label } from '../display/Label';
import { InputElement } from '../Element';

const PlainTextComponent = props => (props.type === 'password' ? '' : props.children);

export class TextField extends InputElement {
   static propTypes = {
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      horizontal: PropTypes.bool,
      plainText: PropTypes.bool,
      prefix: PropTypes.any,
      suffix: PropTypes.any,
      disable: PropTypes.bool,
      validation: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ])
   };

   static componentTypes = {
      Container: FieldPanel,
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

   componentWillMount() {
      this.vmProperty.onValidated(result =>
         this.setState({
            valid: result.valid ? null : false,
            validationMessages: result.messages
         })
      );

      if (this.props.validation) this.vmProperty.addValidation(this.props.validation);
   }

   componentDidMount() {
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
