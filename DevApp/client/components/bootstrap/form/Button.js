import React from 'react';
import { Button as _Button } from 'reactstrap';
import * as utils from '../../utils';

export class Button extends React.Component {
    render() {
        const props = utils.mapStyle(this.props);
        const { submit, cancel, ...rest } = props;
        return <_Button {...rest}>{props.children}</_Button>;
    }
}  
