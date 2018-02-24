import React from 'react';
import { Frame, Panel, RadioToggle, Theme } from '../../elements/bootstrap';
import SampleForm from '../components/SampleForm';

const layoutOptions = [
  { Key: "horizontal", Value: "Horizontal" },
  { Key: "vertical", Value: "Vertical" }
]

const LayoutToggle = props => <RadioToggle id="_layoutOptions" options={layoutOptions} value={props.value} onChange={props.onChange} />

export default class FormDemo extends React.Component {

  state = { horizontal: false };

  get layout() { return this.state.horizontal ? "horizontal" : "vertical" };
  handleLayoutChange = value => this.setState({ horizontal: value === "horizontal" });

  render() {
    return (
      <Theme>
        <Frame>
          <h2>Form Elements</h2>
          <SampleForm vm="SampleForm"
            title={<LayoutToggle value={this.layout} onChange={this.handleLayoutChange} />}
            horizontal={this.state.horizontal}
          />
        </Frame>
      </Theme>
    );
  }
}