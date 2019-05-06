import React from 'react';
import { Panel } from './Panel';
import createWebComponent from '../web-components/PanelComponent';

export const Frame = props => <Panel {...props} noMargin={props.noMargin || false} />;

Frame.propTypes = { ...Frame.propTypes };
Frame.componentTypes = { ...Frame.componentTypes };
Frame._isPanel = true;

let frameComponent = createWebComponent(Frame, 'd-frame');
frameComponent.prototype._connectedCallback = function() {
   this.defaultProps = {
      noMargin: false
   };
};
