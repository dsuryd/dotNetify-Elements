
import React from 'react';
import { PropTypes } from 'prop-types';
import dotnetify from 'dotnetify';

dotnetify.debug = true;

export class VMContext extends React.Component {

    constructor(props) {
        super(props);
        if (props.vm)
            this.vm = dotnetify.react.connect(props.vm, this);
    }

    componentWillUnmount() {
        this.vm.$destroy();
    }

    getChildContext() {
        return {
            state: this.state,
            setState: state => this.setState(state),
            dispatchState: state => this.vm.$dispatch(state),
            getPropAttributes: propId => this.toCamelCase((this.state && this.state[propId + "_attr"]) || {})
        };
    }

    render() {
        return <div>{this.props.children}</div>;
    }

    toCamelCase(obj) {
        let newObj = {};
        for (let key of Object.keys(obj))
            newObj[key.substr(0, 1).toLowerCase() + key.substr(1)] = obj[key];
        return newObj;
    }
}

export const ContextTypes = Object.assign({}, {
    state: PropTypes.object,
    setState: PropTypes.func.isRequired,
    dispatchState: PropTypes.func.isRequired,
    getPropAttributes: PropTypes.func    
});

VMContext.childContextTypes = ContextTypes;
