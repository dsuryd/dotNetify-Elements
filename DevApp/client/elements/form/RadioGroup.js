import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

export class RadioGroup extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        horizontal: PropTypes.bool
    }

    static componentTypes = {
        Container: FieldPanel,
        RadioContainer: undefined,
        RadioLabelComponent: undefined,
        InputComponent: undefined
    }

    constructor(props) {
        super(props);
    }

    get vmInput() { 
        return utils.getVMInput(this);
    }

    handleChange = (event) =>this.vmInput.value = event.target.value;

    render() {
        const [Container, RadioContainer, RadioLabel, Input] = utils.resolveComponents(RadioGroup, this.props);
        const { id, value, attrs } = this.vmInput.props;

        const label = attrs.label || this.props.label;
        const radio = (attrs.options || []).map(opt => (
            <RadioContainer check key={opt.Key} id={id}>
                <RadioLabel check>
                    <Input type="radio" name={id} value={opt.Key} checked={opt.Key == value} onChange={this.handleChange} />
                    {opt.Value}
                </RadioLabel>
            </RadioContainer>
        ));

        return (
            <Container id={id} label={label} horizontal={this.props.horizontal}>
                <section>{radio}</section>
            </Container>
        );
    }
}