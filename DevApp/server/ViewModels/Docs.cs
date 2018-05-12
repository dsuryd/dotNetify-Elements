using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class Docs : BaseVM
   {
      public Docs()
      {
         AddProperty("Overview", Utils.GetResource("dotNetify_Elements.server.Docs.Overview.md").Result);
         AddProperty("Form__TextField", Utils.GetResource("dotNetify_Elements.server.Docs.TextField.md").Result);
      }
   }
}