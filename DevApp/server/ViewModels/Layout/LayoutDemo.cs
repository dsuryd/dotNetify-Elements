using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class LayoutDemo : BaseVM
   {
      public string Content => new Markdown("dotNetify_Elements.server.Docs.Layout.LayoutDemo.md");
   }
}