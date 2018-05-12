import React from 'react';
import styled from 'styled-components';
import { Collapsible } from 'elements';

const ExpanderPanel = styled.div`
   padding: .5rem;
   border-radius: 5px;
   border: 1px solid #ccc;
   background: #ddd;
`;

const ExpanderInnerPanel = styled.div`padding: 1rem .5rem;`;

const Expander = props => (
   <ExpanderPanel>
      <Collapsible collapsed={true} label={<b>See it Live!</b>}>
         <ExpanderInnerPanel>{props.content}</ExpanderInnerPanel>
      </Collapsible>
   </ExpanderPanel>
);

export default Expander;
