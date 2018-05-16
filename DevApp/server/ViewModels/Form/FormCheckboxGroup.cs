using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormCheckboxGroup : BaseVM
   {
      public FormCheckboxGroup()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.xxx.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class FormCheckboxGroupExample : BaseVM
   {
      public FormCheckboxGroupExample()
      {
      }
   }

   public class FormCheckboxGroupCustomize : BaseVM
   {
      public FormCheckboxGroupCustomize()
      {
         AddProperty<string>("My");
      }
   }
}