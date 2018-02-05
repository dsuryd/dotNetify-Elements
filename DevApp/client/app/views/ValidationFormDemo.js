import React from 'react';
import { Frame, Theme } from '../../elements-bootstrap';
import SampleValidationForm from '../components/SampleValidationForm';

const ValidationFormDemo = props => (
  <Theme>
    <Frame>
      <SampleValidationForm vm="SampleValidationForm" title="Validation Form" horizontal />
    </Frame>
  </Theme>
);

export default ValidationFormDemo;