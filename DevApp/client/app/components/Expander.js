import React from 'react';
import styled from 'styled-components';
import { Collapsible } from 'dotnetify-elements';

const ExpanderPanel = styled.div`
   margin-bottom: 1rem;
   padding: .5rem;
   border-radius: 5px;
   border: 1px solid #ccc;
   background: #ddd;
`;

const ExpanderInnerPanel = styled.div`padding: 1rem .5rem;`;

const Expander = props => (
   <ExpanderPanel>
      <Collapsible collapsed={true} label={props.label}>
         <ExpanderInnerPanel>{props.content}</ExpanderInnerPanel>
      </Collapsible>
   </ExpanderPanel>
);

export default Expander;
