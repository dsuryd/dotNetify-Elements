The element to accept multiple choices input. 

[inset]

```csharp
public class CheckboxGroupExample : BaseVM
{
   public enum Choice { A, B, C, D, E, F }

   public CheckboxGroupExample()
   {
      var choices = new Dictionary<Choice, string>
      {
         { Choice.A, "Sound waves" },
         { Choice.B, "Visible light" },
         { Choice.C, "X rays" },
         { Choice.D, "Ultraviolet radiation" },
         { Choice.E, "Gamma rays" },
         { Choice.F, "Microwave radiation" },
      }
      .Select(kvp => KeyValuePair.Create($"{(int)kvp.Key}", kvp.Value));

      AddProperty<string>("Quizz")
         .WithAttribute(this, new CheckboxGroupAttribute
         {
            Label = "Which of the following is part of the electromagnetic spectrum:",
            Options = choices.ToArray()
         });
   }
}
```

#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string.isRequired,

   // Enables the field.
   enable: PropTypes.bool,

   // Text or component for the field's label.
   label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Displays the label text horizontally to the left of the field.
   horizontal: PropTypes.bool,

   // Replaces the input field with plain text.
   plainText: PropTypes.bool
};
```

#### Server-side Attributes

```csharp
public class CheckboxGroupAttribute
{
   // Label text of the field.
   public string Label { get; set; }

   // Checkbox options.
   public KeyValuePair<string, string>[] Options { get; set; }
}
```