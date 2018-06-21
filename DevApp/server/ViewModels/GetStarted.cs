using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class GetStarted : BaseVM
   {
      public string Content => new Markdown("dotNetify_Elements.server.Docs.GetStarted.md");
   }
}