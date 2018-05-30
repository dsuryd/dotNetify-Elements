## PasswordField

The element to accept password input with the text obscured.  

[inset]

```csharp
public class FormPasswordFieldExample : BaseVM
{
   public FormPasswordFieldExample()
   {
      AddProperty<string>("Password")
         .WithAttribute(this, new TextFieldAttribute
         {
            Label = "Password:",
            Placeholder = "Enter password"
         })
         .WithRequiredValidation(this);
   }
}
```

#### Property Types

Same as [TextField](textfield).

#### Server-side Attributes

Same as [TextFieldAttribute](textfield).