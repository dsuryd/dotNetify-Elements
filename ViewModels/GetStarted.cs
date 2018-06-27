using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class GetStarted : BaseVM
   {
      public string Content => new Markdown("dotNetify_Elements.Docs.GetStarted.md");
   }
}