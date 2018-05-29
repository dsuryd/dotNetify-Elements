using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class WorkingWithForms : BaseVM
   {
      public string Content => Utils.GetResource("dotNetify_Elements.server.Docs.WorkingWithForms.md").Result;
   }
}