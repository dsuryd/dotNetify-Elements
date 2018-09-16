using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class LayoutTheme : BaseVM
   {
      public string Content => new Markdown("dotNetify_Elements.Docs.Layout.Theme.md");
   }
}