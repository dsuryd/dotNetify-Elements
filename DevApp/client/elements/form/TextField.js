import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

const InputContainer = styled.div`
    width: calc(100% - 1px);
`;

export class TextField extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        placeholder: PropTypes.string
    }

    static componentTypes = {
        Container: FieldPanel,
        LabelComponent: undefined,
        InputContainer,
        InputComponent: undefined
    }

    constructor(props) {
        super(props);
        this.state = { changed: false };
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({ value: value, changed: true });
        this.context.setState({ [this.props.id]: value });
    }

    handleBlur = _ => {
        if (this.state.changed)
            this.context.dispatchState({ [this.props.id]: this.context.state[this.props.id] });
        this.setState({ changed: false });
    }

    render() {
        const [Container, Label, InputContainer, Input] = utils.resolveComponents(TextField, this.props);

        const vmId = this.context.vmId;
        const props = this.props;
        const attrs = this.context.getPropAttributes(props.id);
        const value = this.context.getState(props.id) || "";
        const label = attrs.label || props.label;

        return (
            <Container horizontal={props.horizontal}>
                {label ? <Label for={`${vmId}.${props.id}`}>{label}</Label> : null}
                <InputContainer>
                    <Input
                        id={`${vmId}.${props.id}`}
                        type={props.type || "text"}
                        placeholder={attrs.placeholder || props.placeholder}
                        value={value}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur} />
                </InputContainer>
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