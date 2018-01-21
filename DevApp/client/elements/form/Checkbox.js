import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

export class Checkbox extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
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

    handleChange = (event) => this.vmInput.value = event.target.checked;

    render() {
        const [Container, Label, Input] = utils.resolveComponents(Checkbox, this.props);
        const { id, value, attrs } = this.vmInput.props;    

        const label = attrs.label || this.props.label;

        return (
            <Container id={id} check>
                <Label check>
                    <Input type="checkbox" name={id} checked={value || false} onChange={this.handleChange} />
                    {label}
                </Label>
            </Container>
        )
    }
}