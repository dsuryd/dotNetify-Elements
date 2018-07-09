using DotNetify;
using DotNetify.Elements;

namespace spa_template
{
   public class Login : BaseVM
   {
      public Login()
      {
         AddProperty<string>("User")
            .WithAttribute(new TextFieldAttribute { Label = "User:" });

         AddProperty<string>("Password")
            .WithAttribute(new TextFieldAttribute { Label = "Password:" });
      }
   }
}