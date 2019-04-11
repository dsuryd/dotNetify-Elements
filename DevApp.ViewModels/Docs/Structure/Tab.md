## Tab

The element to display other elements in a tabbed container. The content of each tab must be placed inside a _TabItem_ element.

To give each tab item a unique identifier, set the _itemKey_ property; otherwise the the tab index will be used.  The active tab can be configured by setting the _active_ property to a tab item's key or index.

[inset]

```csharp
public class TabExample : BaseVM
{
   public TabExample()
   {
      byte[] image = /* load the image bytes */
      AddProperty("Home", /* markdown text */);
      AddProperty("Menu", /* markdown text */);
      AddProperty("MenuPicture", image.ToBase64Image(Utils.Image.Jpeg));
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

   // Occurs when a tab is activated. Emits the tab key or index.
   onActivate: PropTypes.func
};
```

##### TabItem
```jsx
static propTypes = {
   // Identifies the tab item.
   itemKey: PropTypes.string,

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