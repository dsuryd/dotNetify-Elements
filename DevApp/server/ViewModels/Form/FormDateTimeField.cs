using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormDateTimeField : BaseVM
   {
      public FormDateTimeField()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.xxx.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class FormDateTimeFieldExample : BaseVM
   {
      public FormDateTimeFieldExample()
      {
      }
   }

   public class FormDateTimeFieldCustomize : BaseVM
   {
      public FormDateTimeFieldCustomize()
      {
         AddProperty<string>("My");
      }
   }
}