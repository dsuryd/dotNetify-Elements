using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class Customization : BaseVM
   {
      public string Content => new Markdown("dotNetify_Elements.server.Docs.Customization.md");
   }
}