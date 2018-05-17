import React from 'react';
import { PropTypes } from 'prop-types';
import { MarkdownText, Panel, RadioToggle, VMContext } from 'elements';

export default class RenderExample extends React.Component {
   constructor(props) {
      super(props);
      this.boolPropTypes = Object.keys(props.propTypes).filter(x => props.propTypes[x] === PropTypes.bool);

      this.state = {};
      this.boolPropTypes.forEach(x => (this.state[x] = false));
   }

   componentWillMount() {
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
            value = typeof value === 'boolean' ? (value ? '' : null) : `={${value}}`;
            return value !== null ? `${key}${value}` : null;
         })
         .filter(x => x)
         .join(' ');

   render() {
      const { vm, children } = this.props;
      const flags = [ { key: true, value: 'True' }, { key: false, value: 'False' } ];
      const set = (state, value) => {
         const newState = { [state]: value === 'true' ? true : value === 'false' ? false : value };
         this.setState(newState);
         this.props.onChange(newState);
      };

      const radioToggles = this.boolPropTypes.map(x => (
         <RadioToggle key={x} id={'_' + x} label={x + ':'} options={flags} value={this.state[x]} onChange={val => set(x, val)} />
      ));

      return (
         <VMContext vm={vm}>
            <Panel style={{ borderTop: '1px solid #ccc', paddingTop: '2rem' }}>
               {children}
               <Panel horizontal style={{ borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
                  {radioToggles}
               </Panel>
               <MarkdownText text={this.buildCode(this.state)} />
            </Panel>
         </VMContext>
      );
   }
}
