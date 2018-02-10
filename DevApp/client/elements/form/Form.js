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
        this.inputProps = [];
    }

    componentWillUpdate() {
        this.initialState = this.initialState || this.getInitialState();
    }

    dispatchState(state, toServer) {
        if (toServer === true)
            this.context.dispatchState(state);
        else
            this.setState({
                changed: true,
                data: Object.assign({}, this.state.data, state)
            })
    }

    getChildContext() {
        return {
            ...this.context,
            dispatchState: (state, toServer) => this.dispatchState(state, toServer),
            getValidator: (context, propId) => this.getValidator(context, propId)
        };
    }

    getInitialState() {
        return Object.entries(this.context.state)
            .filter(pair => this.inputProps.includes(pair[0]))
            .reduce((aggregate, pair) => Object.assign(aggregate, { [pair[0]]: pair[1] }), {});
    }

    getValidator(context, propId) {
        const validator = new VMInputValidator(context, propId);
        this.validators.push(validator);
        this.inputProps.push(propId);
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
        let formData = Object.assign({}, this.initialState, data);
        if (typeof this.props.onSubmit != "function" || this.props.onSubmit(formData) !== false)
            this.context.dispatchState(this.submitPropId ? ({ [this.submitPropId]: formData }) : data);
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