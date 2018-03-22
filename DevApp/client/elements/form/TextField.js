import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { Label } from '../display/Label';
import { InputElement } from '../Element';

const PlainTextComponent = props => props.type === "password" ? '' : props.children;

export class TextField extends InputElement {

   static propTypes = {
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      horizontal: PropTypes.bool,
      plainText: PropTypes.bool,
      disabled: PropTypes.bool,
      prefix: PropTypes.any,
      suffix: PropTypes.any,
      validation: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
   }

   static componentTypes = {
      Container: FieldPanel,
      InputComponent: undefined,
      InputGroupComponent: undefined,
      ValidationMessageComponent: Label,
      PlainTextComponent
   }

   constructor(props) {
      super(props);
      this.state = { changed: false, validationMessages: [] };
   }

   componentWillMount() {
      this.vmInput.onValidated(result => this.setState({
         valid: result.valid ? null : false,
         validationMessages: result.messages
      }));

      if (this.props.validation)
         this.vmInput.addValidation(this.props.validation);
   }

   componentDidMount() {
      this.vmInput.initMask();
   }

   componentDidUpdate() {
      this.vmInput.initMask();
   }

   handleChange = _ => {
      this.setState({ changed: true });
      this.vmInput.value = this.vmInput.elementValue;
   }

   handleBlur = _ => {
      this.state.changed && this.vmInput.dispatch();
      this.setState({ changed: false });
   }

   render() {
      const [Container, Input, InputGroup, ValidationMessage, PlainText] = this.resolveComponents(TextField);
      const { horizontal, type, ...props } = this.nonAttrProps;
      const { label, placeholder, prefix, suffix, maxLength, plainText } = this.attrs;

      const plainTextValue = `${prefix || ""}${this.value || ""}${suffix || ""}`;

      return (
         <Container id={this.id} label={label} horizontal={horizontal} plainText={plainText}>
            {plainText ? <PlainText type={type}>{plainTextValue}</PlainText> :
               <InputGroup prefix={prefix} suffix={suffix}>
                  <Input
                     valid={this.state.valid}
                     id={this.id}
                     maxLength={maxLength}
                     type={type || "text"}
                     placeholder={placeholder}

                     value={this.value || ""}
                     onChange={this.handleChange}
                     onBlur={this.handleBlur}
                     innerRef={elem => this.vmInput.element = elem}
                     {...props}
                  />
               </InputGroup>
            }
            {this.state.validationMessages.map((message, idx) =>
               <ValidationMessage key={"validationMsg" + idx}>{message}</ValidationMessage>)}
         </Container>
      );
   }
}