## PasswordField

The element to accept password input with the text obscured.  

[inset]

```csharp
public class FormPasswordFieldExample : BaseVM
{
   public FormPasswordFieldExample()
   {
      AddProperty<string>("Password")
         .WithAttribute(new TextFieldAttribute
         {
            Label = "Password:",
            Placeholder = "Enter password"
         })
         .WithRequiredValidation();
   }
}
```

#### Property Types

Same as [TextField](textfield).

#### Server-side Attribute

Same as [TextFieldAttribute](textfield).