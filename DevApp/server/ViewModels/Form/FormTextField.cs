using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormTextField : BaseVM
   {
      public FormTextField()
      {
         AddProperty("Overview", Utils.GetResource("dotNetify_Elements.server.Docs.TextField.md").Result);
         AddProperty("Mask", Utils.GetResource("dotNetify_Elements.server.Docs.TextField_Mask.md").Result);
         AddProperty("API", Utils.GetResource("dotNetify_Elements.server.Docs.TextField_API.md").Result);

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
}