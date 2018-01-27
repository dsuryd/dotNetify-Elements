import React from 'react';
import { Panel, Theme } from '../../elements-bootstrap';
import SampleForm from '../components/SampleForm';

const FormDemo = props => (
  <Theme>
    <Panel stretch>
      <SampleForm vm="SampleForm" title="Vertical Form" />
    </Panel>
  </Theme>
);

export default FormDemo;