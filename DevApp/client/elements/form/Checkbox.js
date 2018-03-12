import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

export class Checkbox extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        plainText: PropTypes.bool
    }

    static componentTypes = {
        Container: undefined,
        LabelComponent: undefined,
        InputComponent: undefined
    }

    constructor(props) {
        super(props);
    }

    get vmInput() {
        return utils.getVMInput(this);
    }

    handleChange = (event) => this.vmInput.dispatch(event.target.checked);

    render() {
        const [Container, Label, Input] = utils.resolveComponents(Checkbox, this.props);
        const { id, value, attrs } = this.vmInput.props;

        let { label, plainText } = this.props;
        label = label || attrs.label;
        plainText = plainText || attrs.plainText;

        const checked = value || false;

        return (
            <Container id={id} checked={checked}>
                <Label>
                    <Input type="checkbox" name={id} checked={checked} onChange={this.handleChange} disabled={plainText} />
                    {label}
                </Label>
            </Container>
        )
    }
}