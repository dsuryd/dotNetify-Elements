using DotNetify;

namespace dotNetify_Elements
{
   public class NameInput : BaseVM
   {
      public NameInput()
      {
         AddProperty<string>("Name");
      }
   }
}