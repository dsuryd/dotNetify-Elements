## Menu

The element to accept navigation input from a selection of routes on a popup window.  The window will open when a designated DOM element is activated, and closed as soon as the selection is made, or the user clicks outside the window.

[inset]

```csharp
public class MenuExample : BaseVM, IRoutable
{
   public RoutingState RoutingState { get; set; }

   public MenuExample()
   {
      AddProperty("Menu", new Menu(
         new MenuItem[] {
            new MenuItem("Introduction", this.Redirect("", "elements/intro")),
            new MenuItem("Disabled Menu") { Disabled = true },
            new MenuSeparator(),
            new MenuGroup("Examples", new MenuItem[]
            {
               new MenuItem("Customer Form", this.Redirect("", "elements/examples/customerform")),
               new MenuItem("Admin Dashboard", this.Redirect("", "elements/examples/dashboard"))
            }) { Icon = "material-icons web" },
            new MenuGroup("Documentation", new MenuItem[]
            {
               new MenuGroup("Structure", new MenuItem[]
               {
                  new MenuItem("Menu", this.Redirect("", "elements/structure/menu"))
               })
            })
         }
      ));
   }
}
```

#### Property Types

```js
static propTypes = {
   // Id of the HTML element that opens the menu.
   openFor: PropTypes.string,

   // Width of the popup window.
   width: PropTypes.string
};
```