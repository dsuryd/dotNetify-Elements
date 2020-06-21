import React from "react";
import PropTypes from "prop-types";
import { Field } from "../structure/Field";
import { RadioGroup } from "./RadioGroup";
import * as utils from "../utils";

export class RadioToggle extends React.Component {
  static propTypes = {
    // Identifies the associated view model property.
    id: PropTypes.string,

    // Enables the field.
    enable: PropTypes.bool,

    // Text or component for the field's label.
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    // Displays the label text horizontally to the left of the field.
    horizontal: PropTypes.bool,

    // Replaces the input field with plain text.
    plainText: PropTypes.bool,

    // Occurs when the value changes.
    onChange: PropTypes.func
  };

  static componentTypes = {
    Container: Field,
    GroupContainer: undefined,
    ToggleContainer: undefined,
    LabelComponent: undefined,
    InputComponent: undefined,
    PlainTextComponent: RadioGroup.componentTypes.PlainTextComponent
  };

  render() {
    const [Container, GroupContainer, ToggleContainer, Label, Input, PlainText] = utils.resolveComponents(
      RadioToggle,
      this.props
    );
    return (
      <RadioGroup
        container={Container}
        groupContainer={GroupContainer}
        radioContainer={ToggleContainer}
        labelComponent={Label}
        inputComponent={Input}
        plainTextComponent={PlainText}
        isToggle={true}
        {...this.props}
      />
    );
  }
}
