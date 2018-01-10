import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../../core/VMContext';

export class Form extends React.Component {

    constructor(props) {
        super(props);
    }

    getChildContext() {
        let context = this.context;
        return {
            vmId: context.vmId,
            state: context.state,
            setState: context.setState,
            dispatchState: context.dispatchState,
            getPropAttributes: context.getPropAttributes
        };
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}

Form.childContextTypes = ContextTypes;
Form.contextTypes = ContextTypes;