import React from 'react';
import { Panel, Theme } from '../../elements-bootstrap';
import SampleForm from '../components/SampleForm';

const HorizontalFormDemo = props => (
  <Theme>
    <Panel stretch>
      <SampleForm vm="SampleFormHorizontal" title="Horizontal Form" horizontal />
    </Panel>
  </Theme>
);

export default HorizontalFormDemo;