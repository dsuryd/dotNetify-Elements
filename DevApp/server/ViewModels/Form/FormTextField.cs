using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormTextField : BaseVM
   {
      public FormTextField()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Form.TextField.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Text Mask"));
         AddProperty("Mask", markdown.GetSection("Text Mask", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class TextFieldExample : BaseVM
   {
      public TextFieldExample()
      {
         AddProperty<string>("Name")
            .WithAttribute(this, new TextFieldAttribute
            {
               Label = "Name:",
               Placeholder = "Enter your name",
               MaxLength = 30
            })
            .WithRequiredValidation(this);

         AddProperty<string>("Phone")
            .WithAttribute(this, new TextFieldAttribute
            {
               Label = "Phone:",
               Placeholder = "Enter your phone",
               Mask = "(999) 999-9999"
            })
            .WithPatternValidation(this, Pattern.USPhoneNumber, "Must be a valid US phone number");

         AddProperty("Amount", 2500)
            .WithAttribute(this, new TextFieldAttribute
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
            .WithMinValidation(this, 20, "Must be at least US$20.00");
      }
   }

   public class TextFieldCustomize : BaseVM
   {
      public TextFieldCustomize()
      {
         AddProperty<string>("MyTextField")
            .WithAttribute(this, new TextFieldAttribute { Label = "Label:", Placeholder = "Placeholder" });
      }
   }
}