import React from "react";
import PropTypes from "prop-types";
import VMContextStore from "../_internal/VMContextStore";

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

    // Occurs on connected; the arguments are the dotNetify VM object and the initial state.
    onConnected: PropTypes.func,

    // Occurs when view model state changes.
    onStateChange: PropTypes.func
  };

  get vmContext() {
    return this.context && this.context.vmContext;
  }

  constructor(props, context) {
    super(props, context);
    this.store = new VMContextStore(this);

    if (window.__dotnetify_ssr__) this.connect();
  }

  componentDidMount() {
    if (!window.__dotnetify_ssr__) this.connect();
  }

  componentWillUnmount() {
    this.store.destroy();
  }

  connect() {
    this.vm = this.store.connect(this.props.vm, this.props.options, state => this.onStateChange(state));
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

  onStateChange(state) {
    if (!this.connected) {
      this.connected = true;
      typeof this.props.onConnected == "function" && this.props.onConnected(this.vm, state);
    }
    typeof this.props.onStateChange == "function" && this.props.onStateChange(state);
  }
}
