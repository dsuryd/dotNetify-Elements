import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import InputElement from "../core/InputElement";
import { Field } from "../structure/Field";
import * as utils from "../utils";

const GroupContainer = styled.section`
  ${props => props.theme.Checkbox.GroupContainer};
`;

const PlainTextComponent = props => <span {...props}>{React.Children.toArray(props.children).join(", ")}</span>;

GroupContainer.defaultProps = { theme: utils.getDefaultTheme() };

export class CheckboxGroup extends InputElement {
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
    GroupContainer,
    CheckboxContainer: undefined,
    LabelComponent: undefined,
    InputComponent: undefined,
    PlainTextComponent
  };

  handleChange = event => {
    let values = this.value || [];
    values = event.target.checked
      ? values.concat([event.target.value])
      : values.filter(value => value != event.target.value);
    this.dispatch(values);
  };

  render() {
    const [Container, GroupContainer, CheckboxContainer, Label, Input, PlainText] = this.resolveComponents(
      CheckboxGroup
    );
    const { fullId, label, plainText, options, inline, horizontal, enable, style, css, tabIndex } = this.attrs;
    const disabled = enable === false;
    const values = this.value || [];

    let checkboxOptions = options || [];
    const checkboxes = checkboxOptions.map((opt, idx) => (
      <CheckboxContainer key={opt.Key} inline={inline} checked={values.includes(opt.Key)}>
        <Input
          type="checkbox"
          id={`${fullId}__input${idx}`}
          value={opt.Key}
          checked={values.includes(opt.Key)}
          disabled={disabled}
          onChange={this.handleChange}
        />
        <Label htmlFor={`${fullId}__input${idx}`}>{opt.Value}</Label>
      </CheckboxContainer>
    ));

    const selected = checkboxOptions.filter(opt => values.includes(opt.Key));
    const plainTextValue = selected.map(x => x.Value);

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
          <GroupContainer id={fullId}>{checkboxes}</GroupContainer>
        )}
      </Container>
    );
  }
}
