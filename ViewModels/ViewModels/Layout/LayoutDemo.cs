using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class LayoutDemo : BaseVM
   {
      public string Content => new Markdown("dotNetify_Elements.Docs.Layout.LayoutDemo.md");
   }
}