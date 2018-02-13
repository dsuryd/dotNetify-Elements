using DotNetify;
using System;
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
         public int Age { get; set; }
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
            .WithAttribute(this, new { Label = "Name:", Placeholder = "Enter name *", MaxLength = 30 })
            .WithRequiredValidation(this);

         AddProperty<string>(nameof(FormData.Email))
            .WithAttribute(this, new { Label = "Email:", Placeholder = "Enter email address" })
            .WithPatternValidation(this, Pattern.Email)
            .WithServerValidation(this, email => IsUnique(email), "Email address is already registered");

         AddProperty<string>(nameof(FormData.Age))
            .WithAttribute(this, new { Label = "Age:", Placeholder = "Enter age *", MaxLength = 3 })
            .WithRequiredValidation(this)
            .WithMinValidation(this, 13);

         AddProperty<ValidatedFormData>("SubmitValidation")
            .SubscribeTo(AddProperty<FormData>("Submit").Select(data => ValidateFormSubmission(data)))
            .SubscribedBy(AddProperty<string>("SubmitSuccess"), x => x.Select(validated => validated.IsValid ? SuccessMessage(validated.FormData) : null))
            .SubscribedBy(AddProperty<string>("SubmitError"), x => x.Select(validated => validated.IsValid ? null : validated.ErrorMessage));
      }

      private ValidatedFormData ValidateFormSubmission(FormData data)
      {
         bool isValid = true;
         string errorMessage = "";

         /* Do server-side validation here */
         if (!data.Email.EndsWith(".org"))
         {
            isValid = false;
            errorMessage = "Email domain must be '.org'";
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
         Email: **{WhitespaceIfEmpty(data.Email)}**  
         Age: **{data.Age}**";

      private string WhitespaceIfEmpty(string text) => !string.IsNullOrEmpty(text) ? text : " ";

      private bool IsUnique(string email) => !email.EndsWith("example.org");
   }
}