import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import VMInputValidator from '../VMInputValidator';
import * as utils from '../utils';

export class Form extends React.Component {

    static contextTypes = ContextTypes;

    static childContextTypes = Object.assign(ContextTypes, {
        getValidator: PropTypes.func
    });

    static propTypes = {
        onSubmit: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = { changed: false };
        this.validators = [];
    }

    componentWillUpdate() {
        this.initialState = this.initialState || this.context.state;
    }

    dispatchState(state) {
        this.setState({
            changed: true,
            data: Object.assign({}, this.state.data, state)
        })
    }

    getChildContext() {
        return {
            ...this.context,
            dispatchState: state => this.dispatchState(state),
            getValidator: (context, propId) => this.getValidator(context, propId)
        };
    }

    getValidator(context, propId) {
        const validator = new VMInputValidator(context, propId);
        this.validators.push(validator);
        return validator;
    }

    handleSubmit() {
        const { data } = this.state;
        if (data) {
            const validationResult = this.validate();
            if (validationResult.valid)
                this.submit(data);
        }
        this.setState({ changed: false, data: null });
        this.initialState = null;
    }

    handleCancel() {
        this.context.setState(this.initialState);
        this.setState({ changed: false, data: null });
    }

    mapButtons(children) {
        return utils.mapChildren(children,
            child => child.props.submit || child.props.cancel,
            child => {
                this.submitPropId = child.props.submit && child.props.id;
                return React.cloneElement(child, {
                    onClick: child.props.submit ? () => this.handleSubmit() : () => this.handleCancel(),
                    disabled: !this.state.changed
                })
            }
        );
    }

    render() {
        return <div>{this.mapButtons(this.props.children)}</div>;
    }

    submit(data) {
        if (typeof this.props.onSubmit != "function" || this.props.onSubmit(data) !== false)
            this.context.dispatchState(this.submitPropId ? ({ [this.submitPropId]: data }) : data);
    }

    validate() {
        return this.validators
            .map(validator => validator.validate())
            .reduce((aggregate, current) => ({
                valid: aggregate.valid && current.valid,
                messages: [...aggregate.messages, ...current.messages]
            }));
    }
}