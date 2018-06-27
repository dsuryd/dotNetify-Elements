using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class LayoutSystem : BaseVM
   {
      public string Content => new Markdown("dotNetify_Elements.Docs.LayoutSystem.md");
   }
}