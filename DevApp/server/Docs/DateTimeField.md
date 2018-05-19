The element to accept date input. 

[inset]

```cs
public class DateTimeFieldExample : BaseVM
{
   public DateTimeFieldExample()
   {
      AddProperty<DateTimeOffset?>("Date", DateTimeOffset.Now)
         .WithAttribute(this, new DateFieldAttribute
         {
            Label = "Date:"
         })
         .WithRequiredValidation(this);

      AddProperty<DateTimeOffset?>("Time", DateTimeOffset.Now)
         .WithAttribute(this, new DateFieldAttribute
         {
            Label = "Time:"
         });

      AddProperty<DateTimeOffset>("DateTime")
         .WithAttribute(this, new DateFieldAttribute
         {
            Label = "Date/time:",
            Placeholder = "Enter date...",
            Min = DateTimeOffset.Now.AddDays(-7),
            Max = DateTimeOffset.Now.AddDays(7)
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

   // Placeholder text to display when the field is empty.
   placeholder: PropTypes.string,

   // Replaces the input field with plain text.
   plainText: PropTypes.bool,

   // Custom validation functions.
   validation: PropTypes.oneOfType([ PropTypes.array, PropTypes.shape({ validate: PropTypes.func, message: PropTypes.string }) ])
};
```

#### Server-side Attributes

```cs
public class DateFieldAttribute
{
   // Label text of the field.
   public string Label { get; set; }

   // Placeholder text to display when the field is empty.
   public string Placeholder { get; set; }

   // Min date value.
   public DateTimeOffset Min { get; set; } = DateTimeOffset.MinValue;

   // Max date value.
   public DateTimeOffset Max { get; set; } = DateTimeOffset.MaxValue;
}
```