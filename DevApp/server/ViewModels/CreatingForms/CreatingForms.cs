using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class CreatingForms : BaseVM
   {
      public CreatingForms()
      {
         AddProperty("CreatingForms", Utils.GetResource("dotNetify_Elements.server.Docs.CreatingForms.md").Result);
      }
   }
}