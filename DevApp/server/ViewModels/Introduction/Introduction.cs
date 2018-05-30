using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class Introduction : BaseVM
   {
      public string Content => new Markdown("dotNetify_Elements.server.Docs.Introduction.md");
   }
}