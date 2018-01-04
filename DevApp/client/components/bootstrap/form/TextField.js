import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { Label, Input } from 'reactstrap';
import { Field } from './Field';
import { ContextTypes } from '../../core/VMContext';

export class TextField extends React.Component {

    constructor(props) {
        super(props);
        this.state = { changed: false };
    }

    handleChange = (event) => {
        let value = event.target.value;
        this.setState({ value: value, changed: true });
        this.context.setState({ [this.props.id]: value });
    }

    handleBlur = _ => {
        if (this.state.changed)
            this.context.dispatchState({ [this.props.id]: this.context.state[this.props.id] });
        this.setState({ changed: false });
    }

    render() {
        if (!this.context.state)
            return null;

        let vmId = this.context.vmId;
        let props = this.props;
        let attrs = this.context.getPropAttributes(props.id);
        let value = this.context.state[props.id];
        let label = attrs.label || props.label;
        return (
            <Field horizontal={props.horizontal}>
                {label ? <Label for={`${vmId}.${props.id}`}>{label}</Label> : null}
                <Input
                    id={`${vmId}.${props.id}`}
                    type={props.type || "text"}
                    placeholder={attrs.placeholder || props.placeholder}
                    value={value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur} />
            </Field>
        );
    }
}

export const EmailField = props => (
    <TextField type="email" {...props} />
);

export const PasswordField = props => (
    <TextField type="password" {...props} />
);

export const TextAreaField = props => (
    <TextField type="textarea" {...props} />
);

TextField.contextTypes = ContextTypes;
EmailField.contextTypes = ContextTypes;
PasswordField.contextTypes = ContextTypes;
TextAreaField.contextTypes = ContextTypes;

TextField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string
};
EmailField.propTypes = Object.assign({}, TextField.propTypes);
PasswordField.propTypes = Object.assign({}, TextField.propTypes);
TextAreaField.propTypes = Object.assign({}, TextField.propTypes);