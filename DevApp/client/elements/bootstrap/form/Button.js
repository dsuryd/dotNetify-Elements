import React from 'react';
import { Button as _Button } from 'reactstrap';
import * as utils from '../../utils';

export class Button extends React.Component {
    render() {
        const { submit, cancel, children, ...rest } = utils.mapStyle(this.props);
        return <_Button {...rest}>{children}</_Button>;
    }
}  
