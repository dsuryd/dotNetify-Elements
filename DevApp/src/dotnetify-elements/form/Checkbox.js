import React from 'react';
import PropTypes from 'prop-types';
import InputElement from '../core/InputElement';
import createWebComponent from '../utils/web-component';

export class Checkbox extends InputElement {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Enables the field.
      enable: PropTypes.bool,

      // Text or component for the field's label.
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Appears as a switch.
      switch: PropTypes.bool,

      // Replaces the input field with plain text.
      plainText: PropTypes.bool,

      // Occurs when the value changes.
      onChange: PropTypes.func
   };

   static componentTypes = {
      Container: undefined,
      LabelComponent: undefined,
      InputComponent: undefined,
      PlainTextComponent: undefined
   };

   handleChange = event => this.dispatch(event.target.checked);

   render() {
      const [ Container, Label, Input, PlainText ] = this.resolveComponents(Checkbox);
      const { fullId, label, plainText, enable, style, css } = this.attrs;

      const checked = !!this.value;
      const disabled = enable === false;

      return (
         <Container id={fullId} checked={checked} style={style} css={css} switch={this.props.switch}>
            {plainText ? (
               <PlainText checked={checked}>{label}</PlainText>
            ) : (
               <React.Fragment>
                  <Input
                     type="checkbox"
                     id={`${fullId}__input`}
                     name={fullId}
                     checked={checked}
                     onChange={this.handleChange}
                     disabled={disabled}
                  />
                  <Label htmlFor={`${fullId}__input`}>{label}</Label>
               </React.Fragment>
            )}
         </Container>
      );
   }
}

createWebComponent(Checkbox, 'd-checkbox');
