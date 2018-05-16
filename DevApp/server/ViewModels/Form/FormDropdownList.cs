using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormDropdownList : BaseVM
   {
      public FormDropdownList()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.xxx.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class FormDropdownListExample : BaseVM
   {
      public FormDropdownListExample()
      {
      }
   }

   public class FormDropdownListCustomize : BaseVM
   {
      public FormDropdownListCustomize()
      {
         AddProperty<string>("My");
      }
   }
}