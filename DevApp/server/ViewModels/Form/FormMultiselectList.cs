using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormMultiselectList : BaseVM
   {
      public FormMultiselectList()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.xxx.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class FormMultiselectListExample : BaseVM
   {
      public FormMultiselectListExample()
      {
      }
   }

   public class FormMultiselectListCustomize : BaseVM
   {
      public FormMultiselectListCustomize()
      {
         AddProperty<string>("My");
      }
   }
}