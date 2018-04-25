using DotNetify;

namespace dotNetify_Elements
{
   public class UserInput : BaseVM
   {
      public UserInput()
      {
         AddProperty<string>("Name");
      }
   }
}