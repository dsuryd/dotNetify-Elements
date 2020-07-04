## Label

The element to display a label text. It can include an icon to the side of the text.

[inset]

```csharp
   public class LabelExample : BaseVM
   {
      public LabelExample()
      {
         var timer = Observable.Interval(TimeSpan.FromSeconds(1)).StartWith(0);

         AddProperty<string>("Clock")
            .SubscribeTo(timer.Select(_ => DateTime.Now.ToString("hh:mm:ss tt")))
            .SubscribedBy(AddInternalProperty<bool>("Update"), _ =>
            {
               PushUpdates();
               return true;
            });

         AddProperty("NotificationLabel", "Notifications");
         AddProperty("NotificationCount", 3);
      }
   }
```

#### Getting Icons

Icons are not included with the _Elements_ library; if you want to use them, you will have to install them yourself. The good news is, there are plenty of options out there.

The icons that you see here came from [Material Icons](https://material.io/tools/icons/). After you link to the font's stylesheet, you can simply set the "material-icons [icon-name]" to the _Label_'s icon attribute; for example: <if react>`<Label icon="material-icons face" />`</if><if webcomponent>`<d-label icon="material-icons face" />`</if>.

If you use [Font Awesome](https://fontawesome.com/get-started), set the icon's class name, for example: <if react>`<Label icon="far fa-times-circle" />`</if><if webcomponent>`<d-label icon="far fa-times-circle" />`</if>.

#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string,

   // Displays the text and icon apart from each other.
   apart: PropTypes.bool,

   // Bold text.
   bold: PropTypes.bool,

   // Icon to the left.
   icon: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Italic text.
   italic: PropTypes.bool,

   // Displays the text and icon from the right.
   right: PropTypes.bool,

   // Icon to the right.
   rightIcon: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])
};
```
