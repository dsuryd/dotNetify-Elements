import React from 'react';
import { Card, Cell, Element, Panel } from 'dotnetify-elements';

const panelCss = `
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
               <Panel key={idx} horizontal childProps={{ flex: true }} css={panelCss}>
                  <Cell>{person.PersonName}</Cell>
                  <Cell right>{person.Status}</Cell>
               </Panel>
            ))}
         </Card>
      );
   }
}
