using DotNetify;
using System.Linq;
using System.Reactive.Linq;

namespace dotNetify_Elements
{
   public class SampleValidationForm : BaseVM
   {
      public class FormData
      {
         public string Name { get; set; }
         public string Email { get; set; }
      }

      public class ValidatedFormData
      {
         public FormData FormData { get; set; }
         public bool IsValid { get; set; }
         public string ErrorMessage { get; set; }
      }

      public SampleValidationForm()
      {
         AddProperty<string>(nameof(FormData.Name))
            .WithAttribute(this, new TextFieldAttribute
            {
               Label = "Name:",
               Placeholder = "Enter name"
            })
            .WithRequiredValidation(this, "Name is required");

         AddProperty<string>(nameof(FormData.Email))
             .WithAttribute(this, new TextFieldAttribute
             {
                Label = "Email:",
                Placeholder = "Enter email address"
             })
             .WithEmailValidation(this, "Email is invalid");


         var submitValidation = AddProperty<ValidatedFormData>("SubmitValidation")
            .SubscribeTo(
               AddProperty<FormData>("Submit").Select(data => ValidateFormSubmission(data)));

         AddProperty<string>("SubmitSuccess")
            .SubscribeTo(submitValidation.Select(validated => validated.IsValid ? SuccessMessage(validated.FormData) : null));

         AddProperty<string>("SubmitError")
            .SubscribeTo(submitValidation.Select(validated => validated.IsValid ? null: validated.ErrorMessage));
      }

      private ValidatedFormData ValidateFormSubmission(FormData data)
      {
         bool isValid = true;
         string errorMessage = "";

         /* Do server-side validation here */
         if (!data.Email.EndsWith("example.org"))
         {
            isValid = false;
            errorMessage = "Email domain is not valid. (Use 'example.org')";
         }
            
         return new ValidatedFormData
         {
            FormData = data,
            IsValid = isValid,
            ErrorMessage = errorMessage
         };
      }

      private string SuccessMessage(FormData data) =>
         $@"**Submitted:**  
         Name: **{data.Name}**  
         Email: **{WhitespaceIfEmpty(data.Email)}**";

      private string WhitespaceIfEmpty(string text) => !string.IsNullOrEmpty(text) ? text : " ";
   }
}