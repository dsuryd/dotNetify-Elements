import React from 'react';
import { Panel } from './Panel';
import createWebComponent from '../utils/web-component';

export const Frame = props => <Panel {...props} noMargin={props.noMargin || false} />;

Frame.propTypes = { ...Frame.propTypes };
Frame.componentTypes = { ...Frame.componentTypes };
Frame._isPanel = true;

let frameComponent = createWebComponent(Frame, 'd-frame');
frameComponent.prototype.isContainer = true;
