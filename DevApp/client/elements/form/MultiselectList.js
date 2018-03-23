import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { InputElement } from '../Element';

const PlainTextComponent = props => <span style={{ minHeight: "2.4rem" }}>{React.Children.toArray(props.children).join(", ")}</span>;

export class MultiselectList extends InputElement {

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

   handleChange = (value) => this.dispatch(value.map(val => val.Key));

   render() {
      const [Container, Input, InputGroup, Tag, Item, List, PlainText] = this.resolveComponents(MultiselectList);
      const { fullId, label, plainText, prefix, suffix, options, horizontal, ...props } = this.attrs;

      const selected = (options || []).filter(opt => this.value.includes(opt.Key));
      const plainTextValue = selected.map(x => x.Value);

      return (
         <Container id={fullId} label={label} horizontal={horizontal} plainText={plainText}>
            {plainText ? <PlainText>{plainTextValue}</PlainText> :
               <InputGroup prefix={prefix} suffix={suffix}>
                  <Input
                     id={fullId}
                     value={this.value}
                     data={options}
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