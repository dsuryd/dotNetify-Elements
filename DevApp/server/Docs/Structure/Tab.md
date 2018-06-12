## Tab

The element to display other elements in a tabbed container.  The active tab can be configured by setting the _active_ property to a tab item's name (or its zero-based index if the name isn't provided).

[inset]

```csharp
public class TabExample : BaseVM
{
   public TabExample()
   {
      byte[] image = /* load the image bytes */
      AddProperty("Home", /* markdown text */);
      AddProperty("Menu", /* markdown text */);
      AddProperty("MenuPicture", $"data:image/jpeg;base64,{Convert.ToBase64String(image)}");
      AddProperty("About", /* markdown text *//);
   }
}
```

#### Property Types

##### Tab
```jsx
static propTypes = {
   // Sets default active tab.
   active: PropTypes.string,

   // Occurs when a tab is activated.
   onActivate: PropTypes.func
};
```

##### TabItem
```jsx
static propTypes = {
   // Text or component for the tab item's label.
   label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,

   // Tab item name.
   name: PropTypes.string,

   // Sets the tab item appearance to active.
   active: PropTypes.bool,

   // Occurs when the tab item is clicked.
   onClick: PropTypes.func
};
```