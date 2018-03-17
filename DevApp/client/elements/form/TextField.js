import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import { FieldPanel } from '../layout/FieldPanel';
import { Label } from '../display/Label';
import * as utils from '../utils';

const PlainTextComponent = props => props.type === "password" ? '' : props.children;

export class TextField extends React.Component {

   static contextTypes = ContextTypes;

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

   get vmInput() {
      return utils.getVMInput(this);
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
      const [Container, Input, InputGroup, ValidationMessage, PlainText] = utils.resolveComponents(TextField, this.props);
      const { id, value, attrs } = this.vmInput.props;

      let { label, placeholder, plainText, prefix, suffix, maxLength, horizontal, type, ...props } = this.props;
      label = label || attrs.label;
      placeholder = placeholder || attrs.placeholder;
      prefix = prefix || attrs.prefix;
      suffix = suffix || attrs.suffix;
      maxLength = maxLength || attrs.maxLength || null;
      plainText = utils.bool(plainText, attrs.plainText);

      const plainTextValue = `${prefix || ""}${value || ""}${suffix || ""}`;

      return (
         <Container id={id} label={label} horizontal={horizontal} plainText={plainText}>
            {plainText ? <PlainText type={type}>{plainTextValue}</PlainText> :
               <InputGroup prefix={prefix} suffix={suffix}>
                  <Input
                     valid={this.state.valid}
                     id={id}
                     maxLength={maxLength}
                     type={type || "text"}
                     placeholder={placeholder}

                     value={value || ""}
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