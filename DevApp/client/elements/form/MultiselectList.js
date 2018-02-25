import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

const PlainTextComponent = props => <span style={{minHeight: "2.4rem"}}>{React.Children.toArray(props.children).join(", ")}</span>;

export class MultiselectList extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        horizontal: PropTypes.bool,
        plainText: PropTypes.bool,
        prefix: PropTypes.any,
        suffix: PropTypes.any
    }

    static componentTypes = {
        Container: FieldPanel,
        InputComponent: undefined,
        InputGroupComponent: undefined,
        TagComponent: undefined,
        ItemComponent: undefined,
        ListComponent: undefined,
        PlainTextComponent
    }

    constructor(props) {
        super(props);
    }

    get vmInput() {
        return utils.getVMInput(this);
    }

    handleChange = (value) => this.vmInput.dispatch(value.map(val => val.Key));

    render() {
        const [Container, Input, InputGroup, Tag, Item, List, PlainText] = utils.resolveComponents(MultiselectList, this.props);
        const { id, value, attrs } = this.vmInput.props;

        const options = (attrs.options || []).map(opt => <option key={opt.Key} value={opt.Key}>{opt.Value}</option>);
        let { label, plainText, horizontal, prefix, suffix, ...props } = this.props;
        label = attrs.label || label;
        prefix = attrs.prefix || prefix;
        suffix = attrs.suffix || suffix;

        const selected = attrs.options.filter(opt => value.includes(opt.Key));
        const plainTextValue = selected.map(x => x.Value);

        return (
            <Container id={id} label={label} horizontal={horizontal} plainText={plainText}>
                {plainText ? <PlainText>{plainTextValue}</PlainText> :
                    <InputGroup prefix={prefix} suffix={suffix}>
                        <Input
                            id={id}
                            value={value}
                            data={attrs.options}
                            valueField='Key'
                            textField='Value'
                            tagComponent={Tag}
                            itemComponent={Item}
                            listComponent={List}
                            prefix={prefix}
                            suffix={suffix}
                            onChange={this.handleChange}
                            {...props}
                        />
                    </InputGroup>
                }
            </Container>
        )
    }
}