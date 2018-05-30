## TextAreaField

The element to accept multi-line text input. 

[inset]

```csharp
public class TextAreaFieldExamples : BaseVM
{
   public TextAreaFieldExamples()
   {
      AddProperty<string>("Comment")
         .WithAttribute(this, new TextAreaFieldAttribute
         {
            Label = "Comment:",
            Placeholder = "Leave a comment",
            MaxLength = 200,
            Rows = 4
         }).
         WithRequiredValidation(this, "You must leave a comment");
   }
}
```

#### Property Types

```jsx
static propTypes = {
   ...TextField.propTypes,

   // Number of rows of the input area.
   rows: PropTypes.number
};
```

#### Server-side Attributes

```csharp
public class TextAreaFieldAttribute
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

   // Number of rows of the input area.
   public int? Rows { get; set; }
}
```