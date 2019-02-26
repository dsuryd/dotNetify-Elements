using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class WebComponents : BaseVM
   {
      public string Content => new Markdown("dotNetify_Elements.Docs.WebComponents.md");
   }
}