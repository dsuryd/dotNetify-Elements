export default class VMProperty {
   constructor(vmContext, propId) {
      this.vmContext = vmContext;
      this.propId = propId;
   }

   get vm() {
      return this.vmContext.vm;
   }

   get vmState() {
      return this.vmContext.getState();
   }

   get fullId() {
      return this.vmContext.vmId ? `${this.vmContext.vmId}.${this.propId}` : this.propId;
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

   dispatch(value, toServer) {
      this.vmContext.dispatchState({ [this.propId]: value }, toServer);
   }

   dispatchProp(propId, value) {
      if (this.vmContext.getState(propId) !== undefined) this.vmContext.setState({ [propId]: value });
      this.vmContext.dispatchState({ [propId]: value });
   }
}
