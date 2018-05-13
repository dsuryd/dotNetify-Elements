The element to accept text input.  It can be configured to use input mask and validate the input.

#### Examples

[inset]

```cs
public class FormTextField : BaseVM
{
   public FormTextField()
   {
      AddProperty<string>("TextField_Name")
         .WithAttribute(this, new TextFieldAttribute
         {
            Label = "Name:",
            Placeholder = "Enter your name",
            MaxLength = 30
         });

      AddProperty<string>("TextField_Phone")
         .WithAttribute(this, new TextFieldAttribute
         {
            Label = "Phone:",
            Placeholder = "Enter your phone",
            Mask = "(999) 999-9999"
         });

      AddProperty("TextField_Payment", 2500f)
         .WithAttribute(this, new TextFieldAttribute
         {
            Label = "Payment:",
            Prefix = "US$",
            Suffix = ".00",
            Mask = new NumberMask
            {
               IncludeThousandsSeparator = true,
               AllowDecimal = false,
               DecimalLimit = 0
            }
         });
   }
}
```

#### Credits

This element incorporates https://github.com/text-mask/text-mask ([license: The Unlicense](https://github.com/text-mask/text-mask/blob/master/LICENSE))
