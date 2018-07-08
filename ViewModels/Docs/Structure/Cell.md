## Cell

The elements to display other elements in a container similar to a table cell.  It can include a header, either as passed as a property value, or nested along with the content and marked with HTML tags `<header>`.

[inset]

#### Cell Grouping

Cell elements are intended to be grouped together on a _Panel_ element to form a grid layout.  When a Panel directly encloses Cell elements, it will set itself with no gap by default.

[inset]
<br/>

```jsx
import React from 'react';
import { Cell, Panel, VMContext } from 'dotnetify-elements';

const tableCss = `
   .cell-header { 
      font-weight: 600; 
      padding: .5rem 1rem; 
      border-bottom: none 
   }
   .cell-body { padding: .5rem 1rem; }
`;

class CellGroupExample extends React.Component {
   state = { Customers: [] };
   render() {
      return (
         <VMContext vm="CellGroupExample" onStateChange={state => this.setState(state)}>
            <Panel horizontal childProps={{ flex: true }} css={tableCss}>
               <Cell header="Name" />
               <Cell header="Address" />
               <Cell header="City" />
            </Panel>
            {this.state.Customers.map(customer => (
               <Panel key={customer.Id} horizontal childProps={{ flex: true }} css={tableCss}>
                  <Cell>{customer.Name.FullName}</Cell>
                  <Cell>{customer.Address.Address1}</Cell>
                  <Cell>{customer.Address.City}</Cell>
               </Panel>
            ))}
         </VMContext>
      );
   }
}
```

```csharp
public class CellGroupExample : BaseVM
{
   public CellGroupExample(ICustomerRepository customerRepository)
   {
      AddProperty("Customers", customerRepository.GetAll().Take(3));
   }
}
```

#### Property Types

```jsx
static propTypes = {

   // Which sides of border to show (comma-delimited): top, left, right, bottom.
   borders: PropTypes.string,

   // Text or component for the card's header.
   header: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Sets custom padding.
   padding: PropTypes.string,

   // Sets custom width.
   width: PropTypes.string
};
```