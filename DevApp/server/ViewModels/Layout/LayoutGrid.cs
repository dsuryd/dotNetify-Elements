using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class LayoutGrid : BaseVM
   {
      public string Content => Utils.GetResource("dotNetify_Elements.server.Docs.Layout.LayoutGrid.md").Result;
   }
}