import React from 'react';
import { Frame, Theme } from '../../elements/bootstrap';
import SampleForm from '../components/SampleForm';

const FormDemo = props => (
  <Theme>
    <Frame>
      <h2>Form Elements</h2>
      <SampleForm vm="SampleForm" title="Vertical Form" />
    </Frame>
  </Theme>
);

export default FormDemo;