import React from 'react';

export default class VMProperty {

   constructor(vmContext, propId) {
      this.vmContext = vmContext;
      this.propId = propId;
   }

   get vm() {
      return this.vmContext.vm;
   }

   get fullId() {
      return `${this.vmContext.vmId}.${this.propId}`;
   }

   get attrs() {
      return this.vmContext.getPropAttributes(this.propId);
   }

   get value() {
      return this.vmContext.getState(this.propId);
   }

   set value(value) {
      this.vmContext.setState({ [this.propId]: value });
   }

   dispatch(value) {
      this.vmContext.dispatchState({ [this.propId]: value });
   }

   dispatchProp(propId, value) {
      this.vmContext.dispatchState({ [propId]: value });
   }
}