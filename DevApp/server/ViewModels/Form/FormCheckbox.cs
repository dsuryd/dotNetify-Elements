using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormCheckbox : BaseVM
   {
      public FormCheckbox()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Form.Checkbox.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class CheckboxExample : BaseVM
   {
      public CheckboxExample()
      {
         AddProperty<bool>("Agree")
            .WithAttribute(this, new CheckboxAttribute
            {
               Label = "I have read and agree to the Terms of Service"
            });
      }
   }

   public class CheckboxCustomize : BaseVM
   {
      public CheckboxCustomize()
      {
         AddProperty<string>("MyCheckbox").WithAttribute(this, new { Label = "Checkbox" });
      }
   }
}