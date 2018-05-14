using DotNetify;
using DotNetify.Elements;
using System.Text.RegularExpressions;

namespace dotNetify_Elements
{
   public class FormTextField : BaseVM
   {
      public FormTextField()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.TextField.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Text Mask"));
         AddProperty("Mask", markdown.GetMarkdownSection("Text Mask", "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class TextFieldExamples : BaseVM
   {
      public TextFieldExamples()
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

         AddProperty("TextField_Payment", 2500)
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
            .WithMinValidation(this, 20, "Must not be less than US$20.00");
      }
   }

   public class TextFieldCustomize : BaseVM
   {
      public TextFieldCustomize()
      {
         AddProperty<string>("MyTextField")
            .WithAttribute(this, new TextFieldAttribute { Label = "Label:" });
      }
   }
}