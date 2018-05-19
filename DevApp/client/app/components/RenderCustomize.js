import React from 'react';
import styled from 'styled-components';
import { Card, MarkdownText, Panel, RadioGroup, TextField, VMContext } from 'elements';
import * as utils from 'elements/utils';

const withHighlight = Component => props => <Component {...props} style={{ border: '2px double red' }} />;

export default class RenderCustomize extends React.Component {
   constructor(props) {
      super(props);
      this.state = { selected: null };
      this.componentTypes = {};
      Object.keys(props.componentTypes).forEach(key => {
         if (props.componentTypes[key]) this.componentTypes[key] = props.componentTypes[key];
      });
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

   select = value => {
      const state = Object.assign({}, { selected: value }, this.props.select(value));
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
               <Card style={{ marginTop: '1rem' }}>
                  <RadioGroup id="_components" label="Select sub-component to highlight:" options={options} value={selected} onChange={this.select} />
               </Card>
               <MarkdownText text={this.buildCode(propsText)} />
            </Panel>
         </VMContext>
      );
   }
}
