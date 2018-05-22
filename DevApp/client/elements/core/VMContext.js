import React from 'react';
import { PropTypes } from 'prop-types';
import dotnetify from 'dotnetify';
import * as utils from '../utils';

export const ContextTypes = {
   vmContext: PropTypes.object,
   theme: PropTypes.object
};

export class VMContext extends React.Component {
   static contextTypes = ContextTypes;

   static childContextTypes = ContextTypes;

   static propTypes = {
      vm: PropTypes.string,
      onStateChange: PropTypes.func
   };

   constructor(props) {
      super(props);
      this.onceHandlers = [];
   }

   get vmId() {
      return this.context && this.context.vmContext ? `${this.context.vmContext.vmId}.${this.props.vm}` : this.props.vm;
   }

   componentDidMount() {
      if (this.vmId) {
         this.removeOrphan(this.vmId);
         this.vm = dotnetify.react.connect(this.vmId, this);
      }
   }

   componentWillUnmount() {
      this.vm.$destroy();
      this.onceHandlers = [];
   }

   componentWillUpdate(props, state) {
      // If something inside this view model context wishes to be notified on changed, then run the check here.
      // Right now this only supports handing notification at most once, just to keep it simple.
      if (this.onceHandlers.length > 0) {
         const changedProps = this.onceHandlers.filter(o => !o.propId || (state.hasOwnProperty(o.propId) && state[o.propId] !== o.value));
         this.onceHandlers = this.onceHandlers.filter(o => !changedProps.includes(o));
         changedProps.forEach(o => o.handler(state[o.propId]));
      }

      this.props.onStateChange && this.props.onStateChange(state);
   }

   getChildContext() {
      return {
         ...this.context,
         vmContext: {
            vmId: this.vmId,
            vm: this.vm,
            getState: id => (id ? (this.state && this.state.hasOwnProperty(id) ? this.state[id] : undefined) : this.state),
            setState: state => this.setState(state),
            dispatchState: state => this.vm.$dispatch(state),
            getPropAttributes: propId => utils.toCamelCase((this.state && this.state[propId + '__attr']) || {}),
            getPropValidations: propId => ((this.state && this.state[propId + '__validation']) || []).map(v => utils.toCamelCase(v)),
            once: (propId, oldValue) =>
               new Promise(resolve =>
                  this.onceHandlers.push({
                     propId: propId,
                     handler: newValue => resolve(newValue),
                     value: oldValue
                  })
               )
         }
      };
   }

   render() {
      const { children, placeholder } = this.props;
      return this.state ? children : placeholder || null;
   }

   removeOrphan(vmId) {
      // Clear any existing connection to the same view model.
      dotnetify.react.getViewModels().filter(vm => vm.$vmId === vmId).forEach(vm => vm.$destroy());
   }
}
