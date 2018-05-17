import React from 'react';
import { PropTypes } from 'prop-types';
import { DropdownList } from './DropdownList';
import { Field } from '../structure/Field';
import { InputElement } from '../core/Element';

const PlainTextComponent = props => <span style={{ minHeight: '2.4rem' }}>{React.Children.toArray(props.children).join(', ')}</span>;

export class MultiselectList extends InputElement {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Disables the field.
      disable: PropTypes.bool,

      // Displays the label text horizontally to the left of the field.      
      horizontal: PropTypes.bool,

      // Text or component for the field's label.      
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Replaces the input field with plain text.
      plainText: PropTypes.bool,
   };

   static componentTypes = {
      Container: Field,
      InputComponent: undefined,
      InputGroupComponent: undefined,
      TagComponent: undefined,
      ItemComponent: undefined,
      ListComponent: undefined,
      PlainTextComponent
   };

   handleChange = value => this.dispatch(value.map(val => val.Key));

   render() {
      const [ Container, Input, InputGroup, Tag, Item, List, PlainText ] = this.resolveComponents(MultiselectList);
      const { fullId, label, plainText, prefix, suffix, options, horizontal, disable, style, ...props } = this.attrs;


      const values = this.value ? this.value.map( x => `${x}`) : [];
      const selected = (options || []).filter(opt => values.includes(opt.Key));
      const plainTextValue = selected.map(x => x.Value);

      return (
         <Container id={fullId} label={label} horizontal={horizontal} plainText={plainText} style={style}>
            {plainText ? (
               <PlainText>{plainTextValue}</PlainText>
            ) : (
               <InputGroup prefix={prefix} suffix={suffix}>
                  <Input
                     id={fullId}
                     value={values}
                     data={options}
                     valueField="Key"
                     textField="Value"
                     tagComponent={Tag}
                     itemComponent={Item}
                     listComponent={List}
                     prefix={prefix}
                     suffix={suffix}
                     disabled={disable}
                     onChange={this.handleChange}
                     {...props}
                  />
               </InputGroup>
            )}
         </Container>
      );
   }
}
