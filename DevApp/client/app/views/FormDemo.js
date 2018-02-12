import React from 'react';
import { Frame, Theme } from '../../elements-bootstrap';
import SampleForm from '../components/SampleForm';

const FormDemo = props => (
  <Theme>
    <Frame>
      <h1>Form Elements</h1>
      <SampleForm vm="SampleForm" title="Vertical Form" />
    </Frame>
  </Theme>
);

export default FormDemo;