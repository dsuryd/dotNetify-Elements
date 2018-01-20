
import React from 'react';
import { PropTypes } from 'prop-types';
import dotnetify from 'dotnetify';
import * as utils from './utils';

dotnetify.debug = true;

export class VMContext extends React.Component {

    constructor(props) {
        super(props);
        if (props.vm) {
            this.removeOrphan(props.vm);
            this.vm = dotnetify.react.connect(props.vm, this);
        }
    }

    componentWillUnmount() {
        this.vm.$destroy();
    }

    getChildContext() {
        return {
            ...this.context,
            vmId: this.props.vm,
            vm: this.vm,
            state: this.state,
            getState: id => (this.state && this.state[id]) || undefined,
            setState: state => this.setState(state),
            dispatchState: state => this.vm.$dispatch(state),
            getPropAttributes: propId => utils.toCamelCase((this.state && this.state[propId + "_attr"]) || {})
        };
    }

    render() {
        return this.state ? <div>{this.props.children}</div> : null;
    }

    removeOrphan(vmId) {
        dotnetify.react.getViewModels()
            .filter(vm => vm.$vmId === vmId)
            .forEach(vm => vm.$destroy());
    }
}

export const ContextTypes = Object.assign({}, {
    vmId: PropTypes.string.isRequired,
    vm: PropTypes.object.isRequired,
    state: PropTypes.object,
    getState: PropTypes.func.isRequired,
    setState: PropTypes.func.isRequired,
    dispatchState: PropTypes.func.isRequired,
    getPropAttributes: PropTypes.func.isRequired
});

VMContext.childContextTypes = ContextTypes;
