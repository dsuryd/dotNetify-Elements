## RichTextEditor

The element to accept rich text input. 

[inset]

```csharp
public class RichTextEditorExamples : BaseVM
{
   public RichTextEditorExamples()
   {
      AddProperty<string>("Notes")
         .WithAttribute(new TextAreaFieldAttribute
         {
            Label = "Notes:",
            Placeholder = "Enter your notes here",
            MaxLength = 200
         });
   }
}
```

#### Property Types

```jsx
static propTypes = {
   
};
```

#### Server-side Attribute

```csharp
public class RichTextEditorAttribute
{
   // Label text of the field.
   public string Label { get; set; }

   // Placeholder text to display when the field is empty.
   public string Placeholder { get; set; }

   // Input max length.
   public int? MaxLength { get; set; }
}
```