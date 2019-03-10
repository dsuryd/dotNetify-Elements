import React from 'react';
import PropTypes from 'prop-types';
import VMContextStore from '../_internal/VMContextStore';
import createWebComponent from '../_internal/VMContextComponent';

export const ContextTypes = {
   vmContext: PropTypes.object,
   theme: PropTypes.object
};

export class VMContext extends React.Component {
   static contextTypes = ContextTypes;
   static childContextTypes = ContextTypes;

   static propTypes = {
      // View model name to connect to.
      vm: PropTypes.string,

      // Connection options.
      options: PropTypes.object,

      // Occurs when view model state changes.
      onStateChange: PropTypes.func
   };

   constructor(props) {
      super(props);
      this.store = new VMContextStore(this);
   }

   get vmContext() {
      return this.context && this.context.vmContext;
   }

   componentDidMount() {
      this.store.connect(this.props.vm, this.props.options, this.props.onStateChange);
   }

   componentWillUnmount() {
      this.store.destroy();
   }

   getChildContext() {
      return {
         ...this.context,
         vmContext: this.store.context
      };
   }

   render() {
      const { children, placeholder } = this.props;
      return this.state ? children : placeholder || null;
   }
}

createWebComponent(VMContext, 'd-vm-context');
