using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class Form : BaseVM
   {
      public Form()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.Form.Form.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }
}