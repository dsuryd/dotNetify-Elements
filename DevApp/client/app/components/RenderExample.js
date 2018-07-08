import React from 'react';
import { Markdown, Panel, RadioToggle, VMContext } from 'dotnetify-elements';
import { isBoolPropType } from 'dotnetify-elements/utils';

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
      let props = this.formatPropsForDisplay(state);
      if (props.length > 0) props = props + ' ';
      return this.props.buildCode(props);
   };

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
      const { vm, extraToggles, children } = this.props;
      const flags = [ { key: true, value: 'True' }, { key: false, value: 'False' } ];
      const set = (state, value) => {
         const newState = { [state]: value === 'true' ? true : value === 'false' ? false : value };
         this.setState(newState);
         this.props.onChange(newState);
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
            <Markdown>{this.buildCode(this.state)}</Markdown>
         </Panel>
      );

      const placeholder = <div style={{ minHeight: '50rem' }} />;

      if (vm) return <VMContext vm={vm} placeholder={placeholder} children={content} />;
      return content;
   }
}
