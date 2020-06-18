import React from "react";
import { Panel } from "./Panel";

export const Frame = props => (
  <Panel {...props} noMargin={props.noMargin || false} />
);

Frame.propTypes = { ...Frame.propTypes };
Frame.componentTypes = { ...Frame.componentTypes };
Frame._isPanel = true;
