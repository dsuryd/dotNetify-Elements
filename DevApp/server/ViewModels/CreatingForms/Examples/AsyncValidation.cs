using DotNetify;
using DotNetify.Elements;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;

namespace dotNetify_Elements
{
   public class AsyncValidation : BaseVM
   {
      private class FormData
      {
         public string Name { get; set; }
         public string Email { get; set; }
      }

      private List<FormData> _registeredList = new List<FormData>();

      public AsyncValidation()
      {
         var clearForm = AddInternalProperty<bool>("ClearForm");

         AddProperty<string>("Name")
            .WithAttribute(this, new TextFieldAttribute
            {
               Label = "Name:",
               Placeholder = "Enter your name (required)"
            })
            .WithRequiredValidation(this)
            .SubscribeTo(clearForm.Select(_ => ""));

         AddProperty<string>("Email")
            .WithAttribute(this, new TextFieldAttribute
            { 
               Label = "Email:", 
               Placeholder = "Enter your email address" 
            })
            .WithPatternValidation(this, Pattern.Email, "Must be a valid email address.")
            .WithServerValidation(this, ValidateEmailNotRegistered, "Email already registered")
            .SubscribeTo(clearForm.Select(_ => ""));

         AddProperty<FormData>("Register")
            .WithAttribute(this, new { Label = "Register" })
            .SubscribedBy(
               AddProperty<string>("SubmitResponse"), submittedData => Save(submittedData))
                  .SubscribedBy(clearForm, _ => true);        
      }

      private string Save(FormData data) 
      {
         _registeredList.Add(data);
         return $"The name __'{data.Name}'__ with email '{data.Email}' was registered.";
      } 

      private bool ValidateEmailNotRegistered(string email) => !_registeredList.Any(x => x.Email == email);
   }
}