using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormNumberField : BaseVM
   {
      public FormNumberField()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.xxx.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class FormNumberFieldExample : BaseVM
   {
      public FormNumberFieldExample()
      {
      }
   }

   public class FormNumberFieldCustomize : BaseVM
   {
      public FormNumberFieldCustomize()
      {
         AddProperty<string>("My");
      }
   }
}