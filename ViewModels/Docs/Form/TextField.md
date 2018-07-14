## TextField

The element to accept single-line text input, and can be configured to use input mask and apply validation.

[inset]

```csharp
public class TextFieldExamples : BaseVM
{
   public TextFieldExamples()
   {
      AddProperty<string>("Name")
         .WithAttribute(new TextFieldAttribute
         {
            Label = "Name:",
            Placeholder = "Enter your name",
            MaxLength = 30
         })
         .WithRequiredValidation();

      AddProperty<string>("Phone")
         .WithAttribute(new TextFieldAttribute
         {
            Label = "Phone:",
            Placeholder = "Enter your phone",
            Mask = "(999) 999-9999"
         })
         .WithPatternValidation(Pattern.USPhoneNumber, "Must be a valid US phone number");

      AddProperty("Amount", 2500f)
         .WithAttribute(new TextFieldAttribute
         {
            Label = "Payment:",
            Prefix = "US$",
            Suffix = ".00",
            MaxLength = 11,
            Mask = new NumberMask
            {
               IncludeThousandsSeparator = true,
               AllowDecimal = false,
               DecimalLimit = 0
            }
         })
         .WithMinValidation(20, "Must not be less than US$20.00");
   }
}
```

#### Text Mask

Mask pattern can be of the following combinations:
- A - alphabets (both uppercase and lowercase)
- U - uppercase only
- 9 - digits
- \* - alphanumerics

#### Number Mask

Use __NumberMask__ type to format user input as currency:
```csharp
public class NumberMask : Mask
{
   // Text to display before the input.
   public string Prefix { get; set; } = "";

   // Text to display after the input.
   public string Suffix { get; set; } = "";

   // Separates thousands.
   public bool IncludeThousandsSeparator { get; set; } = true;

   // Character to separate thousands.
   public string ThousandsSeparatorSymbol { get; set; } = ",";

   // Allow fraction input.
   public bool AllowDecimal { get; set; }

   // Character to represent the decimal point.
   public string DecimalSymbol { get; set; } = ".";

   // Max numbers after the decimal point.
   public int DecimalLimit { get; set; } = 2;

   // Max numbers for the integer portion.
   public int IntegerLimit { get; set; }

   // Always includes a decimal point.
   public bool RequireDecimal { get; set; }

   // Allows negative number.
   public bool AllowNegative { get; set; }

   // Allows entering zeroes first. 
   public bool AllowLeadingZeroes { get; set; }
}
```

#### Source

https://github.com/text-mask/text-mask ([license: The Unlicense](https://github.com/text-mask/text-mask/blob/master/LICENSE))

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

   // Max input length.
   maxLength: PropTypes.number,

   // Placeholder text to display when the field is empty.
   placeholder: PropTypes.string,

   // Replaces the input field with plain text.
   plainText: PropTypes.bool,

   // Text or component to display before the field.
   prefix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Text or component to display after the field.
   suffix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Custom validation functions.
   validation: PropTypes.oneOfType([ PropTypes.array, PropTypes.shape({ validate: PropTypes.func, message: PropTypes.string }) ])
};
```

#### Server-side Attribute

```csharp
public class TextFieldAttribute
{
   // Label text of the field.
   public string Label { get; set; }

   // Placeholder text to display when the field is empty.
   public string Placeholder { get; set; }

   // Text to display before the field.
   public string Prefix { get; set; }

   // Text to display after the field.
   public string Suffix { get; set; }

   // Input max length.
   public int? MaxLength { get; set; }

   // Input mask, can be number mask or text mask.
   public Mask Mask { get; set; }
}
```

#### Validation Patterns

```csharp
public static class Pattern
{
   public const string Email = @"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

   public const string Digit = @"^[0-9]+$";

   public const string Currency = @"^[0-9]+(\.\[0-9]+)?$";

   public const string Number = @"^[-+]?\[0-9]+(\.\[0-9]+)?$";

   public const string Alphabet = @"^[a-zA-Z]*$";

   public const string Alphanumeric = @"^[a-zA-Z0-9]+$";

   public const string URL = @"^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$";

   public const string USPhoneNumber = @"^((([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+)*$";

   public const string USZipCode = @"^([0-9]{5}(?:-[0-9]{4})?)*$";

   public const string IPAddress = @"^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$";

   public const string USSocialSecurityNumber = @"[0-9]{3}-[0-9]{2}-[0-9]{4}$";
}
```