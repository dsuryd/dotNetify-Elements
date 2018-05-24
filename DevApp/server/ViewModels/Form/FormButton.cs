using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormButton : BaseVM
   {
      public FormButton()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.Button.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class FormButtonExample : BaseVM
   {
      public FormButtonExample()
      {
         //AddProperty("Primary")
      }
   }

   public class FormButtonCustomize : BaseVM
   {
      public FormButtonCustomize()
      {
         AddProperty<string>("My");
      }
   }
}