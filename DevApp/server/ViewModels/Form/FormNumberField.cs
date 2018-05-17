using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormNumberField : BaseVM
   {
      public FormNumberField()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.NumberField.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class NumberFieldExample : BaseVM
   {
      public NumberFieldExample()
      {
      }
   }

   public class NumberFieldCustomize : BaseVM
   {
      public NumberFieldCustomize()
      {
         AddProperty<string>("MyNumberField");
      }
   }
}