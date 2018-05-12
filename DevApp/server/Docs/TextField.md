## TextField

This element allows user to input text.  

##### Examples

[inset]

##### Property Types
```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string.isRequired,

   // Label text of the field.
   label: PropTypes.string,

   // Placeholder text to display when the field is empty.
   placeholder: PropTypes.string,

   // Displays the label text horizontally to the left of the field.
   horizontal: PropTypes.bool,

   // Replaces the input field with plain text.
   plainText: PropTypes.bool,

   // Text or component to display before the field.
   prefix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Text or component to display after the field.
   suffix: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Custom validation functions.
   validation: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
   
   // Disables the field.
   disable: PropTypes.bool
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