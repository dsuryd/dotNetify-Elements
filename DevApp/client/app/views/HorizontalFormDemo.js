import React from 'react';
import { Panel } from '../../elements-bootstrap';
import SampleForm from '../components/SampleForm';

const HorizontalFormDemo = props => (
  <Panel stretch>
    <SampleForm vm="SampleFormHorizontal" title="Horizontal Form" horizontal />
  </Panel>
);

export default HorizontalFormDemo;