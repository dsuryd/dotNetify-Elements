## TextField

The element to accept text input.  It can be configured to validate the input and show errors.

##### Examples

[inset]

##### Property Types
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
   validation: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ])
};
```

##### Server-side Attributes
```cs
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