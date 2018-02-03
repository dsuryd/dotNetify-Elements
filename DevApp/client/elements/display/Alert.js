import React from 'react';
import { PropTypes } from 'prop-types';
import * as utils from '../utils';

export class Alert extends React.Component {

    static componentTypes = {
        AlertComponent: undefined
    }

    render() {
        const [_Alert] = utils.resolveComponents(Alert, this.props);
        const { children, ...rest } = utils.mapStyle(this.props);
        return <_Alert {...rest}>{children}</_Alert>;
    }
}  
