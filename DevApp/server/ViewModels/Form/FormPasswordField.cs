using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormPasswordField : BaseVM
   {
      public FormPasswordField()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.xxx.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class FormPasswordFieldExample : BaseVM
   {
      public FormPasswordFieldExample()
      {
      }
   }

   public class FormPasswordFieldCustomize : BaseVM
   {
      public FormPasswordFieldCustomize()
      {
         AddProperty<string>("My");
      }
   }
}