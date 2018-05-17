The element to accept . 

[inset]

```cs
public class MultiselectListExample : BaseVM
{
   public enum VisitPurpose
   {
      Holiday,
      Business,
      Education,
      Employment,
      Medical,
      Transit,
      Other
   }

   public MultiselectListExample()
   {
      var options = new Dictionary<VisitPurpose, string>
      {
         { VisitPurpose.Holiday, "Holiday" },
         { VisitPurpose.Business, "Business" },
         { VisitPurpose.Education, "Education" },
         { VisitPurpose.Employment, "Employment" },
         { VisitPurpose.Medical, "Medical" },
         { VisitPurpose.Transit, "Transit" },
         { VisitPurpose.Other, "Other" },
      }
      .Select(kvp => KeyValuePair.Create($"{(int)kvp.Key}", kvp.Value));

      AddProperty<VisitPurpose[]>("VisitPurpose")
         .WithAttribute(this, new DropdownListAttribute
         {
            Label = "Purpose of visit:",
            Placeholder = "Select all that apply",
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

   // Displays the label text horizontally to the left of the field.      
   horizontal: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Text or component for the field's label.      
   label: PropTypes.string,

   // Replaces the input field with plain text.
   plainText: PropTypes.bool,
};
```

#### Server-side Attributes

```cs
public class MultiselectListAttribute
{
   // Label text of the field.
   public string Label { get; set; }

   // Placeholder text to display when the field is empty.
   public string Placeholder { get; set; }

   // Options to select.
   public KeyValuePair<string, string>[] Options { get; set; }
}
```