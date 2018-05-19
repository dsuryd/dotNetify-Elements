The element to accept a choice input from of a set of options that are visually represented as radio buttons. 

[inset]

```cs
public class RadioGroupExample : BaseVM
{
   public enum Weather
   {
      Sunny,
      Cloudy,
      Rainy,
      Foggy
   }

   public RadioGroupExample()
   {
      var options = new Dictionary<Weather, string>
      {
         { Weather.Sunny, "Sunny" },
         { Weather.Cloudy, "Cloudy" },
         { Weather.Rainy, "Rainy" },
         { Weather.Foggy, "Foggy" },
      }
      .Select(kvp => KeyValuePair.Create($"{(int)kvp.Key}", kvp.Value));

      AddProperty("Weather", Weather.Sunny)
         .WithAttribute(this, new RadioGroupAttribute
         {
            Label = "Weather:",
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

```cs
public class RadioGroupAttribute
{
   // Label text of the field.
   public string Label { get; set; }

   // Options to select.
   public KeyValuePair<string, string>[] Options { get; set; }
}
```