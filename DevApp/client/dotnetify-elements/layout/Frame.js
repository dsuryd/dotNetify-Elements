import React from 'react';
import { Panel } from './Panel';

export const Frame = props => <Panel noMargin={false} {...props} />;

Frame.propTypes = { ...Frame.propTypes };
Frame.componentTypes = { ...Frame.componentTypes };
