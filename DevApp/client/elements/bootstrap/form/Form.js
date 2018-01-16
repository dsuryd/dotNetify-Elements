import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../../VMContext';
import * as utils from '../../utils';

export class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = { changed: false };
    }

    getChildContext() {
        return {
            ...this.context,
            dispatchState: state => this.setState({ changed: true, data: Object.assign({}, this.state.data, state) })
        };
    }

    handleSubmit() {
        const { data } = this.state;
        if (data)
            this.context.dispatchState(data);
        this.setState({ changed: false, data: null });
    }

    handleCancel() {
        this.setState({ changed: false, data: null });
    }

    mapButtons(children) {
        return utils.mapChildren(children,
            child => child.props.submit || child.props.cancel,
            child => React.cloneElement(child, {
                onClick: child.props.submit ? () => this.handleSubmit() : () => this.handleCancel(),
                disabled: !this.state.changed
            })
        );
    }

    render() {
        return <div>{this.mapButtons(this.props.children)}</div>;
    }
}

Form.childContextTypes = ContextTypes;
Form.contextTypes = ContextTypes;