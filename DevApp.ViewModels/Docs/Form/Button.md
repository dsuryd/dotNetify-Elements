## Button

The element to accept command input. To dispatch custom command argument, provide the _onClick_ event handler returning the argument.

[inset]

```csharp
public class ButtonExample : BaseVM
{
   private int _addCounter;

   public ButtonExample()
   {
      AddProperty<object>("Add")
         .WithAttribute(new ButtonAttribute { Label = "Add" })
         .SubscribedBy(AddProperty<string>("AddCounter"), _ => $"Added: {++_addCounter}");

      AddProperty<DateTimeOffset>("Remove")
         .SubscribedBy(AddProperty<string>("RemoveTimeStamp"), date => $"Removed: {date.ToString("T")}");
   }
}
```

#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string,

   // Associates the button with form cancel action.
   cancel: PropTypes.bool,

   // Enables the button.
   enable: PropTypes.bool,

   // Text or component for the button's label.
   label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Negative color.
   negative: PropTypes.bool,

   // Positive color.
   positive: PropTypes.bool,

   // Primary color.
   primary: PropTypes.bool,

   // Secondary color.
   secondary: PropTypes.bool,

   // Shows the button.
   show: PropTypes.bool,

   // Fills the available space.
   stretch: PropTypes.bool,

   // Associates the button with form submit action.
   submit: PropTypes.bool
};
```

#### Server-side Attribute

```csharp
public class ButtonAttribute
{
   // Label text of the button.
   public string Label { get; set; }
}
```