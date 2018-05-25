using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormPasswordField : BaseVM
   {
      public FormPasswordField()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.Form.PasswordField.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
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