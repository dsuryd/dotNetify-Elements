import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { VMInput } from '../VMInput';
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
        InputComponent: undefined
    }

    constructor(props) {
        super(props);
        this.state = { changed: false };
    }

    componentWillMount() {
        this.vmInput = new VMInput(this.context, this.props.id);
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
        const [Container, Input] = utils.resolveComponents(TextField, this.props);
        const { id, value, attrs } = this.vmInput.props;

        const label = attrs.label || this.props.label;
        const placeholder = attrs.placeholder || this.props.placeholder;

        return (
            <Container id={id} label={label} horizontal={this.props.horizontal}>
                <Input
                    id={id}
                    type={this.props.type || "text"}
                    placeholder={placeholder}
                    value={value || ""}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur} />
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