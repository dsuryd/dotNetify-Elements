## NavMenu

The element to display navigation menu.

[inset]

```csharp
public class NavMenuExample : BaseVM, IRoutable
{
   public RoutingState RoutingState { get; set; }

   public NavMenuExample()
   {
      AddProperty("NavMenu", new NavMenu(
         new NavMenuItem[]
         {
            new NavRoute("Introduction",  this.Redirect("", "elements/intro")),
            new NavGroup
            {
               Label = "Form",
               Routes = new NavRoute[]
               {
                  new NavRoute("Basic Demo",  this.Redirect("", "elements/form/demo"))
               },
               IsExpanded = false
            },
            new NavGroup
            {
               Label = "Examples",
               Routes = new NavRoute[]
               {
                  new NavRoute(
                     "Customer Info",  
                     this.Redirect("", "elements/examples/customer-info"), 
                     "material-icons web")
               }
            }
         }));
   }
}
```

#### Property Types

```jsx
static propTypes = {
   // Default selected item.
   selected: PropTypes.string
};
```

#### Server-side Object

```csharp
public class NavMenu : List<NavMenuItem>
{
   public NavMenu(NavMenuItem[] navMenuItems);
}

public abstract class NavMenuItem
{
   public string Label { get; set; }
   public string Icon { get; set; }
}

public class NavGroup : NavMenuItem
{
   public bool IsExpanded { get; set; } = true;
   public NavRoute[] Routes { get; set; }
}

public class NavRoute : NavMenuItem
{
   public Route Route { get; set; }

   public NavRoute();
   public NavRoute(string label, Route route, string icon = null);
}
```