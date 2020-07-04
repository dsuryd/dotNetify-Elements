import styled from "styled-components";
import { Element } from "dotnetify-elements";
import * as utils from "dotnetify-elements/utils";

const Select = styled.select`
  width: calc(100% - 1.5rem);

  margin-left: 0.75rem;
  margin-top: 1rem;
  font-weight: 500;
  border-color: #92d050;
  background-color: transparent;
  &:focus {
    background-color: transparent;
  }
`;

const getCurrentFramework = () => {
  const params = Array.from(new URLSearchParams(window.location.search).keys()).map(x => x.toLowerCase());
  if (params.includes("webcomponent")) return "WebComponent";
  else if (params.includes("react")) return "React";
  return window.localStorage["framework"] || "React";
};

export const frameworkSelectEvent = utils.createEventEmitter();
export let currentFramework = getCurrentFramework();
export const FrameworkContext = React.createContext();

frameworkSelectEvent.subscribe(framework => {
  if (framework) {
    currentFramework = framework;
    window.localStorage["framework"] = currentFramework;
  }
});

export default class SelectFramework extends Element {
  handleChange = value => {
    frameworkSelectEvent.emit(value);
    this.dispatch(value);
    this.props.onChange(value);
  };

  componentDidMount() {
    if (this.value !== currentFramework) this.dispatch(currentFramework);
  }

  render() {
    return (
      <Select className="form-control" value={currentFramework} onChange={e => this.handleChange(e.target.value)}>
        <option value="React">React</option>
        <option value="WebComponent">Web Component</option>
      </Select>
    );
  }
}
