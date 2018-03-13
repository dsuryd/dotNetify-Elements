import React from 'react';
import { PropTypes } from 'prop-types';
import * as utils from '../utils';

export class Button extends React.Component {

    static propTypes = {
        submit: PropTypes.bool,
        cancel: PropTypes.bool,
        disabled: PropTypes.bool
    }

    static componentTypes = {
        ButtonComponent: undefined
    }

    render() {
        const [_Button] = utils.resolveComponents(Button, this.props);
        const { submit, cancel, ...props } = this.props;
        return <_Button {...props} />
    }
}  
