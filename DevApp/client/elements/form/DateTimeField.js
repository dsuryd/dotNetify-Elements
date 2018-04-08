import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { Label } from '../display/Label';
import { InputElement } from '../Element';
import moment from 'moment';

const PlainTextComponent = props => {
   const date = new Date(props.children);
   return date.getFullYear() === 0 ? '' : date.toLocaleDateString();
};

export class DateTimeField extends InputElement {
   static propTypes = {
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      horizontal: PropTypes.bool,
      plainText: PropTypes.bool,
      disable: PropTypes.bool,
      prefix: PropTypes.any,
      suffix: PropTypes.any,
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
      this.state = { changed: false, validationMessages: [] };
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

   handleChange = value => {
      this.setState({ changed: true });
      this.value = new moment(value).toISOString(true);
   };

   handleBlur = _ => {
      this.state.changed && this.dispatch();
      this.setState({ changed: false });
   };

   render() {
      const [ Container, Input, InputGroup, ValidationMessage, PlainText ] = this.resolveComponents(DateTimeField);
      const { fullId, label, plainText, prefix, suffix, min, max, horizontal, disable, ...props } = this.attrs;

      let dateValue = new Date(this.value);
      dateValue = dateValue.getFullYear() === 0 ? null : dateValue;

      return (
         <Container id={fullId} label={label} horizontal={horizontal} plainText={plainText}>
            {plainText ? (
               <PlainText>{this.value}</PlainText>
            ) : (
               <InputGroup prefix={prefix} suffix={suffix}>
                  <Input
                     valid={this.state.valid}
                     id={fullId}
                     value={dateValue}
                     min={new Date(min)}
                     max={new Date(max)}
                     prefix={prefix}
                     suffix={suffix}
                     disabled={disable}
                     onChange={this.handleChange}
                     onBlur={this.handleBlur}
                     {...props}
                  />
               </InputGroup>
            )}
            {this.state.validationMessages.map((message, idx) => <ValidationMessage key={'validationMessage' + idx}>{message}</ValidationMessage>)}
         </Container>
      );
   }
}

export const DateField = props => <DateTimeField time={false} {...props} />;

export const TimeField = props => <DateTimeField date={false} {...props} />;

DateField.propTypes = Object.assign({}, DateTimeField.propTypes);
TimeField.propTypes = Object.assign({}, DateTimeField.propTypes);
