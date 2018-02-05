import React from 'react';
import { Frame, Theme } from '../../elements-bootstrap';
import SampleForm from '../components/SampleForm';

const HorizontalFormDemo = props => (
  <Theme>
    <Frame>
      <SampleForm vm="SampleFormHorizontal" title="Horizontal Form" horizontal />
    </Frame>
  </Theme>
);

export default HorizontalFormDemo;