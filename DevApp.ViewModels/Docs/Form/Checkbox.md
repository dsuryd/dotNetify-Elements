## Checkbox

The element to accept a choice input. 

[inset]

```csharp
public class CheckboxExample : BaseVM
{
   public CheckboxExample()
   {
      AddProperty("Agree", true)
         .WithAttribute(new CheckboxAttribute
         {
            Label = "I have read and agree to the Terms of Service"
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

   // Replaces the input field with plain text.
   plainText: PropTypes.bool,

   // Appears as a switch.
   switch: PropTypes.bool
};
```

#### Server-side Attribute

```csharp
public class CheckboxAttribute
{
   // Label text of the field.
   public string Label { get; set; }
}
```