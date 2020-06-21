import dotnetify from "dotnetify";
import * as utils from "../utils";

export default class VMContextStore {
  constructor(host) {
    this.host = host;
    this.vmId = null;
    this.vm = null;
    this.onceHandlers = [];
  }

  connect(vmId, options, onStateChange) {
    vmId = this.host.vmContext ? `${this.host.vmContext.vmId}.${vmId}` : vmId;
    if (!vmId) throw new Error("'vmId' is required by connect()");

    this.removeOrphan(vmId);
    this.vm = dotnetify.react.connect(vmId, this.host, {
      setState: state => {
        this.setState(state);
        this.notifyStateChange(state, onStateChange);
      },
      ...options
    });

    this.vmId = vmId;
    return this.vm;
  }

  destroy() {
    this.vm.$destroy();
    this.onceHandlers = [];
    this.vm = null;
  }

  get context() {
    return {
      vmId: this.vmId,
      vm: this.vm,
      getState: id => (id ? (this.state.hasOwnProperty(id) ? this.state[id] : undefined) : this.state),
      setState: state => this.setState(state),
      dispatchState: state => this.vm.$dispatch(state),
      getPropAttributes: propId => utils.toCamelCase(this.state[propId + "__attr"] || {}),
      getPropValidations: propId => (this.state[propId + "__validation"] || []).map(v => utils.toCamelCase(v)),
      once: (propId, oldValue) =>
        new Promise(resolve =>
          this.onceHandlers.push({
            propId: propId,
            handler: newValue => resolve(newValue),
            value: oldValue
          })
        )
    };
  }

  get state() {
    return this.host.state;
  }

  setState(state) {
    this.host.setState(state);
  }

  notifyStateChange(state, onStateChange) {
    // If something inside this view model context wishes to be notified on state change, then run the check here.
    // Right now this only supports handing notification at most once, just to keep it simple.
    if (this.onceHandlers.length > 0) {
      const changedProps = this.onceHandlers.filter(
        o => !o.propId || (state.hasOwnProperty(o.propId) && state[o.propId] !== o.value)
      );
      this.onceHandlers = this.onceHandlers.filter(o => !changedProps.includes(o));
      changedProps.forEach(o => o.handler(state[o.propId]));
    }

    typeof onStateChange == "function" && onStateChange(state);
  }

  removeOrphan(vmId) {
    // Clear any existing connection to the same view model.
    dotnetify.react
      .getViewModels()
      .filter(vm => vm.$vmId === vmId)
      .forEach(vm => vm.$destroy());
  }
}
