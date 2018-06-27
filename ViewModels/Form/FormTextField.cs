using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormTextField : BaseVM
   {
      public FormTextField()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Form.TextField.md");

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

         AddProperty("Amount", 2500)
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
            .WithMinValidation(20, "Must be at least US$20.00");
      }
   }

   public class TextFieldCustomize : BaseVM
   {
      public TextFieldCustomize()
      {
         AddProperty<string>("MyTextField")
            .WithAttribute(new TextFieldAttribute { Label = "Label:", Placeholder = "Placeholder" });
      }
   }
}