import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Element from "../core/Element";

const ImageComponent = styled.img``;

export class Image extends Element {
  static propTypes = {
    // Identifies the associated view model property.
    id: PropTypes.string,

    // Image source.
    src: PropTypes.string
  };

  static componentTypes = {
    ImageComponent: ImageComponent
  };

  static _typeName = "Image";

  render() {
    const [_Image] = this.resolveComponents(Image);
    const { fullId, src, children, ...props } = this.attrs;
    const _src = this.value || src;

    return _src ? <_Image id={fullId} src={_src} {...props} /> : null;
  }
}
