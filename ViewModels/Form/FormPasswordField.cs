using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormPasswordField : BaseVM
   {
      public FormPasswordField()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Form.PasswordField.md");

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
            .WithAttribute(new TextFieldAttribute
            {
               Label = "Password:",
               Placeholder = "Enter password"
            })
            .WithRequiredValidation();
      }
   }

   public class PasswordFieldCustomize : BaseVM
   {
      public PasswordFieldCustomize()
      {
         AddProperty<string>("MyPasswordField")
            .WithAttribute(new TextFieldAttribute
            {
               Label = "Password:",
               Placeholder = "Enter password"
            });
      }
   }
}