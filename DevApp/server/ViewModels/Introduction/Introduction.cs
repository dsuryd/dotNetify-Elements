using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class Introduction : BaseVM
   {
      public Introduction()
      {
         AddProperty("Intro", Utils.GetResource("dotNetify_Elements.server.Docs.Introduction.md").Result);
      }
   }
}