using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormCheckbox : BaseVM
   {
      public FormCheckbox()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.xxx.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class FormCheckboxExample : BaseVM
   {
      public FormCheckboxExample()
      {
      }
   }

   public class FormCheckboxCustomize : BaseVM
   {
      public FormCheckboxCustomize()
      {
         AddProperty<string>("My");
      }
   }
}