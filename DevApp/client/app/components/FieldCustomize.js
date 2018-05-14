import React from 'react';
import styled from 'styled-components';
import { Card, MarkdownText, Panel, RadioGroup, TextField, VMContext } from 'elements';
import * as utils from 'elements/utils';

const withHighlight = Component => props => <Component style={{ border: '2px double red' }} {...props} />;

export default class FieldCustomize extends React.Component {
   constructor(props) {
      super(props);
      this.componentTypes = props.componentTypes;
      this.state = { selected: null };
   }

   buildCode = props => {
      if (props.length > 0) props = props + ' ';
      let code = `
\`\`\`jsx
<${this.props.name} id="MyField" ${props}/>
\`\`\``;
      return code;
   };

   customize(component, customize) {
      return customize ? withHighlight(component) : component;
   }

   setSelected = value => {
      const state = Object.assign({}, { selected: value }, this.props.setSelected(value));
      this.setState(state);
      this.props.onSelected(state);
   };

   render() {
      const { selected, plainText, validationMessages } = this.state;
      const flags = [ { key: true, value: 'True' }, { key: false, value: 'False' } ];
      const options = Object.keys(this.componentTypes).map(key => ({ key: key, value: utils.toCamelCase(key) }));

      let componentProps = Object.keys(this.componentTypes).reduce((all, item) => ({ ...all, [item]: this.componentTypes[item] }), {});
      if (selected) componentProps[utils.toCamelCase(selected)] = withHighlight(componentProps[selected]);

      const propsText = selected ? `${utils.toCamelCase(selected)}=withHighlight(${this.props.name}.componentTypes.${selected})` : '';

      return (
         <VMContext vm={this.props.vm}>
            <Panel>
               {React.cloneElement(React.Children.only(this.props.children), { ...componentProps })}
               <Card>
                  <RadioGroup id="_components" label="Select sub-component to highlight:" options={options} value={selected} onChange={this.setSelected} />
               </Card>
               <MarkdownText text={this.buildCode(propsText)} />
            </Panel>
         </VMContext>
      );
   }
}
