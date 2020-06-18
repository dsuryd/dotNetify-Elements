import React from "react";
import PropTypes from "prop-types";
import InputElement from "../core/InputElement";
import { Field } from "../structure/Field";
import Quill from "quill/dist/quill";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

const PlainTextComponent = props => (
  <span dangerouslySetInnerHTML={{ __html: props.children }} />
);

export class RichTextEditor extends InputElement {
  static propTypes = {
    // Identifies the associated view model property.
    id: PropTypes.string.isRequired,

    // Quill configuration (see quilljs.org).
    config: PropTypes.object,

    // Enables the field.
    enable: PropTypes.bool,

    // Text or component for the field's label.
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    // Displays the label text horizontally to the left of the field.
    horizontal: PropTypes.bool,

    // Placeholder text to display when the field is empty.
    placeholder: PropTypes.string,

    // Replaces the input field with plain text.
    plainText: PropTypes.bool,

    // Occurs when the value changes.
    onChange: PropTypes.func
  };

  static componentTypes = {
    Container: Field,
    PlainTextComponent
  };

  constructor(props) {
    super(props);
    this.state = { ...this.state };
    this.changed = false;
  }

  handleBlur = _ => {
    this.changed && this.dispatch();
    this.changed = false;
  };

  handleChange = value => {
    this.changed = true;
    this.value = value;
    this.props.onChange && this.props.onChange(value);
  };

  componentDidMount() {
    if (!this.attrs.plainText) this.initializeEditor();
  }

  componentDidUpdate() {
    if (this.attrs.plainText && this.editor) this.editor = null;
    this.initializeEditor();
  }

  initializeEditor() {
    const { placeholder, enable, config } = this.attrs;

    if (this.editorDom && !this.editor) {
      let options = config || {};
      options.placeholder = options.placeholder || placeholder;
      options.theme = options.theme || "snow";

      this.editor = new Quill(this.editorDom, options);
      this.editor.on("selection-change", range => {
        if (!range) {
          this.handleBlur();
          this.changed && onChange && onChange(this.value);
        }
      });
      this.editor.on("text-change", _ => {
        this.handleChange(this.editor.root.innerHTML);
      });

      if (this.value) this.editor.clipboard.dangerouslyPasteHTML(this.value);
    }

    if (this.editor) this.editor.enable(enable !== false);
  }

  render() {
    const [Container, PlainText] = this.resolveComponents(RichTextEditor);
    const {
      fullId,
      label,
      plainText,
      horizontal,
      css,
      style,
      children,
      ...props
    } = this.attrs;

    const plainTextValue = `${this.value || ""}`;
    this.editorDom = null;

    return (
      <Container
        id={fullId}
        label={label}
        horizontal={horizontal}
        plainText={plainText}
        style={style}
        css={css}
      >
        {plainText ? (
          <PlainText>{plainTextValue}</PlainText>
        ) : (
          <div ref={elem => (this.editorDom = elem)} />
        )}
      </Container>
    );
  }
}
