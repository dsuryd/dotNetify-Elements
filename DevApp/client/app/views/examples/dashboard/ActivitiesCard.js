import React from 'react';
import { Card, Cell, CellPanel, Element } from 'dotnetify-elements';

export default class ActivitiesCard extends Element {
   render() {
      const activities = this.value || [];
      return (
         <Card horizontal>
            {activities.map((person, idx) => (
               <CellPanel key={idx} horizontal childProps={{ css: 'padding: 0', flex: true }}>
                  <Cell>{person.PersonName}</Cell>
                  <Cell>{person.Status}</Cell>
               </CellPanel>
            ))}
         </Card>
      );
   }
}
