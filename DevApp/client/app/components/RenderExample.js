import React from 'react';
import { Checkbox, Markdown, Panel, RadioToggle, VMContext } from 'dotnetify-elements';

export default class RenderExample extends React.Component {
   constructor(props) {
      super(props);
      this.boolPropTypes = Object.keys(props.propTypes);

      this.state = {};
      this.trueByDefaultProps = [
         'enable',
         'show',
         ...(props.defaultProps ? Object.keys(props.defaultProps).filter(x => props.defaultProps[x]) : [])
      ];
      this.boolPropTypes.forEach(x => (this.state[x] = this.trueByDefaultProps.includes(x)));
   }

   componentDidMount() {
      this.props.onChange(this.state);
   }

   buildCode = state => {
      let props = this.showWebComponent ? this.formatAttrsForDisplay(state) : this.formatPropsForDisplay(state);
      if (props.length > 0) props = props + ' ';
      return this.props.buildCode(props ? ' ' + props.trim() : ``);
   };

   // For web component attributes display.
   formatAttrsForDisplay = props =>
      Object.keys(props)
         .map(key => {
            let value = props[key];
            if (this.trueByDefaultProps.includes(key)) return value ? '' : `${key}="${value}"`;

            value = typeof value === 'boolean' ? (value ? '="true"' : null) : `='${value}'`;
            return value !== null ? `${key}${value}` : null;
         })
         .filter(x => x)
         .join(' ');

   formatPropsForDisplay = props =>
      Object.keys(props)
         .map(key => {
            let value = props[key];
            if (this.trueByDefaultProps.includes(key)) return value ? '' : `${key}={${value}}`;

            value = typeof value === 'boolean' ? (value ? '' : null) : `={${value}}`;
            return value !== null ? `${key}${value}` : null;
         })
         .filter(x => x)
         .join(' ');

   render() {
      const { vm, extraToggles, onWebComponent, children } = this.props;
      const flags = [ { key: true, value: 'True' }, { key: false, value: 'False' } ];
      const set = (state, value) => {
         const newState = { [state]: value === 'true' || value === 'false' ? value === 'true' : value };
         this.setState(newState);
         this.props.onChange(newState);
      };

      const showWebComponent = show => {
         this.showWebComponent = show;
         onWebComponent(show);
      };

      const radioToggles = this.boolPropTypes.map(x => (
         <RadioToggle
            css="padding-bottom: 1rem"
            key={x}
            id={'_' + x}
            label={x + ':'}
            options={flags}
            value={this.state[x]}
            onChange={val => set(x, val)}
         />
      ));

      const content = (
         <Panel css="border-top: 1px solid #ccc; padding-top: 3rem; padding-left: 3px">
            {children}
            <Panel css="border-top: 1px solid #ccc; padding-top: 1rem">
               <Panel wrap>
                  {radioToggles}
                  {extraToggles}
               </Panel>
            </Panel>
            {onWebComponent && (
               <Checkbox
                  id="_webComponent"
                  label={<span style={{ fontWeight: '500' }}>Web component</span>}
                  switch={true}
                  onChange={showWebComponent}
               />
            )}
            <Markdown>{this.buildCode(this.state)}</Markdown>
         </Panel>
      );

      const placeholder = <div style={{ minHeight: '50rem' }} />;

      if (vm) return <VMContext vm={vm} placeholder={placeholder} children={content} />;
      return content;
   }
}
