import React from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
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

        let props = this.props;
        let attrs = this.context.getPropAttributes(props.id);
        let value = this.context.state[props.id];        
        let label = attrs.label || props.label;
        return (
            <FormGroup>
                {label ? <Label for={props.id}>{label}</Label> : null}
                <Input
                type={props.type || "text"}
                id={props.id}
                placeholder={attrs.placeholder || props.placeholder}
                value={value}
                onChange={this.handleChange}
                onBlur={this.handleBlur} />                
            </FormGroup>
        );
    }
}

export const EmailField = props => (
    <TextField type="email" id={props.id} label={props.label} placeholder={props.placeholder} />
);

export const PasswordField = props => (
    <TextField type="password" id={props.id} label={props.label} placeholder={props.placeholder} />
);

export const TextAreaField = props => (
    <TextField type="textarea" id={props.id} label={props.label} placeholder={props.placeholder} />
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