using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormPasswordField : BaseVM
   {
      public FormPasswordField()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Form.PasswordField.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class PasswordFieldExample : BaseVM
   {
      public PasswordFieldExample()
      {
         AddProperty<string>("Password")
            .WithAttribute(this, new TextFieldAttribute
            {
               Label = "Password:",
               Placeholder = "Enter password"
            })
            .WithRequiredValidation(this);
      }
   }

   public class PasswordFieldCustomize : BaseVM
   {
      public PasswordFieldCustomize()
      {
         AddProperty<string>("MyPasswordField")
            .WithAttribute(this, new TextFieldAttribute
            {
               Label = "Password:",
               Placeholder = "Enter password"
            });
      }
   }
}