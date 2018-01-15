import React from 'react';
import { Panel } from '../../elements-bootstrap';
import SampleForm from '../components/SampleForm';

const FormDemo = props => (
  <Panel stretch>
    <SampleForm vm="SampleForm" title="Vertical Form" />
  </Panel>
);

export default FormDemo;