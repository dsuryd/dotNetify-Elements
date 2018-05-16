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

      AddProperty("RadioToggle_State", Position.Middle)
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
   ...RadioGroup.propTypes
};
```

#### Server-side Attributes

```cs
public class RadioGroupAttribute
{
   public string Label { get; set; }
   public KeyValuePair<string, string>[] Options { get; set; }
}
```