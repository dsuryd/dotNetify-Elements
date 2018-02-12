import React from 'react';
import { Frame, Theme } from '../../elements-bootstrap';
import SampleForm from '../components/SampleForm';

const HorizontalFormDemo = props => (
  <Theme>
    <Frame>
      <h2>Form Elements</h2>
      <SampleForm vm="SampleFormHorizontal" title="Horizontal Form" horizontal />
    </Frame>
  </Theme>
);

export default HorizontalFormDemo;