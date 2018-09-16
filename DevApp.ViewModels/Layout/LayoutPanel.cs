using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class LayoutPanel : BaseVM
   {
      public LayoutPanel()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Layout.Panel.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }
}