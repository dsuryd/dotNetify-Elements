## Cell

The elements to display other elements in a container similar to a table cell.  It can include a header, either as passed as a property value, or nested along with the content and marked with HTML tags `<header>`.

[inset]

#### Cell Group

Cell elements are intended to be grouped together on a __CellPanel__ to form a grid layout:

[inset]
<br/>
```jsx
class CellGroupExample extends React.Component {
   state = { Customers: [] };
   tableTheme = {
      ...defaultTheme,
      Cell: {
         HeaderContainer: 'font-weight: 500',
         BodyContainer: 'padding: .5rem'
      }
   };
   render() {
      return (
         <Theme theme={this.tableTheme}>
            <VMContext vm="CellGroupExample" onStateChange={state => this.setState(state)}>
               <CellPanel horizontal childProps={{ flex: true }}>
                  <Cell header="Name" />
                  <Cell header="Address" />
                  <Cell header="City" />
               </CellPanel>
               {this.state.Customers.map(customer => (
                  <CellPanel key={customer.Id} horizontal childProps={{ flex: true }}>
                     <Cell>{customer.Name.FullName}</Cell>
                     <Cell>{customer.Address.Address1}</Cell>
                     <Cell>{customer.Address.City}</Cell>
                  </CellPanel>
               ))}
            </VMContext>
         </Theme>
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

   // Sets custom width.
   width: PropTypes.string
};
```