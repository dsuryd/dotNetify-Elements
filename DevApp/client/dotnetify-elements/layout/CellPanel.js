import React from 'react';
import { Panel } from './Panel';

export const CellPanel = props => <Panel noGap={true} {...props} />;

CellPanel.propTypes = { ...Panel.propTypes };
CellPanel.componentTypes = { ...Panel.componentTypes };
CellPanel._isPanel = true;
