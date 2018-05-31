## DropdownList

The element to accept a selection input from a set of options shown in a dropdown menu. 

[inset]

```csharp
public class DropdownListExample : BaseVM
{
   public enum TaxFilingStatus
   {
      None,
      Single,
      MarriedFilingJointly,
      MarriedFilingSeparately,
      HeadOfHousehold,
      QualifyingWidowWidower
   }

   public DropdownListExample()
   {
      var options = new Dictionary<TaxFilingStatus, string>
      {
         { TaxFilingStatus.None, ""},
         { TaxFilingStatus.Single, "Single" },
         { TaxFilingStatus.MarriedFilingJointly, "Married Filing Jointly" },
         { TaxFilingStatus.MarriedFilingSeparately, "Married Filing Separately" },
         { TaxFilingStatus.HeadOfHousehold, "Head of Household" },
         { TaxFilingStatus.QualifyingWidowWidower, "Qualifying Widow(er) with Dependent Child" }
      }
      .Select(kvp => KeyValuePair.Create($"{(int)kvp.Key}", kvp.Value));

      AddProperty<TaxFilingStatus>("FilingStatus")
         .WithAttribute(new DropdownListAttribute
         {
            Label = "Filing status:",
            Placeholder = "Select one...",
            Options = options.ToArray()
         })
         .WithRequiredValidation();
   }
}
```

#### Empty Selection

Add the default empty selection by providing an option with an empty string value.  If specified, the _Placeholder_ text will replace the empty string. 

#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string.isRequired,

   // Enables the field.
   enable: PropTypes.bool,

   // Displays the label text horizontally to the left of the field.      
   horizontal: PropTypes.bool,

   // Text or component for the field's label.      
   label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Replaces the input field with plain text.
   plainText: PropTypes.bool,

   // Text or component to display before the field.
   prefix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Text or component to display after the field.
   suffix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),      
};
```

#### Server-side Attributes

```csharp
public class DropdownListAttribute
{
   // Label text of the field.
   public string Label { get; set; }

   // Placeholder text to display when the field is empty.
   public string Placeholder { get; set; }

   // Text to display before the field.
   public string Prefix { get; set; }

   // Text to display after the field.
   public string Suffix { get; set; }

   // Options to select.
   public KeyValuePair<string, string>[] Options { get; set; }
}
```