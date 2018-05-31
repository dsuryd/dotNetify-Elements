## MultiselectList

The element to accept multiple selections input from a set of options shown in a dropdown menu. 

[inset]

```csharp
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
         .WithAttribute(new MultiselectListAttribute
         {
            Label = "Purpose of visit:",
            Placeholder = "Select all that apply",
            Options = options.ToArray()
         })
         .WithRequiredValidation();
   }
}
```

#### Source

This element incorporates https://github.com/jquense/react-widgets ([license: MIT](https://github.com/jquense/react-widgets/blob/master/LICENSE.md))

#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string.isRequired,

   // Enables the field.
   enable: PropTypes.bool,

   // Displays the label text horizontally to the left of the field.      
   horizontal: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Text or component for the field's label.      
   label: PropTypes.string,

   // Replaces the input field with plain text.
   plainText: PropTypes.bool,
};
```

#### Server-side Attributes

```csharp
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