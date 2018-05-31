using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormNumberField : BaseVM
   {
      public FormNumberField()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Form.NumberField.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class NumberFieldExample : BaseVM
   {
      public NumberFieldExample()
      {
         AddProperty<int?>("HeightFeet")
          .WithAttribute(new NumberFieldAttribute
          {
             Label = "Height (ft):",
             Placeholder = "Feet",
             Suffix = "'",
             Min = 0,
             Max = 8
          })
          .WithRangeValidation(0, 8, "Must be between 0' and 8'");

         AddProperty<int?>("HeightInches")
          .WithAttribute(new NumberFieldAttribute
          {
             Label = "Height (in):",
             Placeholder = "Inches",
             Suffix = "''",
             Min = 0,
             Max = 11
          })
          .WithMinValidation(0, "Must be at least 0''")
          .WithMaxValidation(11, "Must be at most 11''");
      }
   }

   public class NumberFieldCustomize : BaseVM
   {
      public NumberFieldCustomize()
      {
         AddProperty<string>("MyNumberField")
            .WithAttribute(new NumberFieldAttribute { Label = "Label:", Placeholder = "Placeholder" });
      }
   }
}