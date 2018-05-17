The element to accept input of a single selection out of a set of options, which are visually represented as toggle buttons. 

[inset]

```cs
public class RadioToggleExample : BaseVM
{
   public enum Position
   {
      Left,
      Middle,
      Right
   }

   public RadioToggleExample()
   {
      var options = new Dictionary<Position, string>
      {
         { Position.Left, "Left" },
         { Position.Middle, "Middle" },
         { Position.Right, "Right" },
      }
      .Select(kvp => KeyValuePair.Create($"{(int)kvp.Key}", kvp.Value));

      AddProperty("Position", Position.Middle)
         .WithAttribute(this, new RadioGroupAttribute
         {
            Label = "Position:",
            Options = options.ToArray()
         });
   }
}
```

#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string.isRequired,

   // Disables the field.
   disable: PropTypes.bool,

   // Text or component for the field's label.
   label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Displays the label text horizontally to the left of the field.
   horizontal: PropTypes.bool,

   // Replaces the input field with plain text.
   plainText: PropTypes.bool
};
```

#### Server-side Attributes

Same as [RadioGroup](radiogroup).
