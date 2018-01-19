import React from 'react';
import * as utils from '../utils';

export class Button extends React.Component {

    static componentTypes = {
        ButtonComponent: undefined
    }

    render() {
        const [_Button] = utils.resolveComponents(Button, this.props);
        const { submit, cancel, children, ...rest } = utils.mapStyle(this.props);
        return <_Button {...rest}>{children}</_Button>;
    }
}  
