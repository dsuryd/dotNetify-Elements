import React from 'react';
import { Panel, Theme } from '../../elements-bootstrap';
import SampleValidationForm from '../components/SampleValidationForm';

const ValidationFormDemo = props => (
  <Theme>
    <Panel stretch>
      <SampleValidationForm vm="SampleValidationForm" title="Validation Form" horizontal />
    </Panel>
  </Theme>
);

export default ValidationFormDemo;