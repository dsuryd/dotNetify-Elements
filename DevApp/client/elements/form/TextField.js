import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import { FieldPanel } from '../layout/FieldPanel';
import * as utils from '../utils';

export class TextField extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        placeholder: PropTypes.string
    }

    static componentTypes = {
        Container: FieldPanel,
        InputComponent: undefined,
        ValidationMessageComponent: undefined
    }

    constructor(props) {
        super(props);
        this.state = { changed: false, validationMessages: [] };
    }

    get vmInput() {
        return utils.getVMInput(this);
    }

    componentWillMount() {
        this.vmInput.onValidated(result => this.setState({
            valid: result.valid ? null : false,
            validationMessages: result.messages
        }));
    }

    handleChange = (event) => {
        this.setState({ changed: true });
        this.vmInput.set(event.target.value);
    }

    handleBlur = _ => {
        this.state.changed && this.vmInput.dispatch();
        this.setState({ changed: false });
    }

    render() {
        const [Container, Input, ValidationMessage] = utils.resolveComponents(TextField, this.props);
        const { id, value, attrs } = this.vmInput.props;

        const label = attrs.label || this.props.label;
        const placeholder = attrs.placeholder || this.props.placeholder;
        const maxLength = attrs.maxLength || this.props.maxLength;


        return (
            <Container id={id} label={label} horizontal={this.props.horizontal}>
                <Input
                    valid={this.state.valid}
                    id={id}
                    maxLength={maxLength}
                    type={this.props.type || "text"}
                    placeholder={placeholder}
                    value={value || ""}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur} />
                {this.state.validationMessages.map((message, idx) =>
                    <ValidationMessage key={"validationMessage" + idx}>{message}</ValidationMessage>)}
            </Container>
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

EmailField.contextTypes = ContextTypes;
PasswordField.contextTypes = ContextTypes;
TextAreaField.contextTypes = ContextTypes;

EmailField.propTypes = Object.assign({}, TextField.propTypes);
PasswordField.propTypes = Object.assign({}, TextField.propTypes);
TextAreaField.propTypes = Object.assign({}, TextField.propTypes);