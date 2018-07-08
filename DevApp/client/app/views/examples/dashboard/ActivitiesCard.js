import React from 'react';
import { Card, Cell, CellPanel, Element } from 'dotnetify-elements';

const cellPanelCss = `
   .cell { border: none; }
   .cell-body { padding: .5rem 0 }
`;

export default class ActivitiesCard extends Element {
   render() {
      const activities = this.value || [];
      return (
         <Card horizontal>
            <h4>Activities</h4>
            {activities.map((person, idx) => (
               <CellPanel key={idx} horizontal childProps={{ flex: true }} css={cellPanelCss}>
                  <Cell>{person.PersonName}</Cell>
                  <Cell>{person.Status}</Cell>
               </CellPanel>
            ))}
         </Card>
      );
   }
}
