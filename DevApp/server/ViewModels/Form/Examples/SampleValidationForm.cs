using System;
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class SampleValidationForm : BaseVM
   {
      public class FormData
      {
         public string Name { get; set; }
         public string Phone { get; set; }
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
            .WithAttribute(new { Label = "Name:", Placeholder = "Enter name *", MaxLength = 30 })
            .WithRequiredValidation();

         AddProperty<string>(nameof(FormData.Phone))
            .WithAttribute(new TextFieldAttribute
            {
               Label = "Phone:",
               Placeholder = "Enter phone number",
               Mask = "(999) 999-9999"
            })
            .WithPatternValidation(Pattern.USPhoneNumber);

         AddProperty<string>(nameof(FormData.Email))
            .WithAttribute(new { Label = "Email:", Placeholder = "Enter email address" })
            .WithPatternValidation(Pattern.Email)
            .WithServerValidation(email => IsUnique(email), "Email address is already registered");

         AddProperty<string>(nameof(FormData.Age))
            .WithAttribute(new { Label = "Age:", Placeholder = "Enter age *", MaxLength = 3 })
            .WithRequiredValidation()
            .WithMinValidation(13);

         AddInternalProperty<ValidatedFormData>("SubmitValidation")
            .SubscribeTo(AddInternalProperty<FormData>("Submit").Select(data => ValidateFormSubmission(data)))
            .SubscribedBy(AddProperty<string>("SubmitSuccess"), validated => validated.IsValid ? SuccessMessage(validated.FormData) : null)
            .SubscribedBy(AddProperty<string>("SubmitError"), validated => validated.IsValid ? null : validated.ErrorMessage);
      }

      private ValidatedFormData ValidateFormSubmission(FormData data)
      {
         bool isValid = true;
         string errorMessage = "";

         /* Do server-side validation here */
         if (data.Email?.EndsWith(".org") == false)
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
         $@"**Submitted:**<br/>
         Name: **{data.Name}**<br/>
         Phone: **{WhitespaceIfEmpty(data.Phone)}**<br/>
         Email: {WhitespaceIfEmpty(data.Email)}<br/>
         Age: **{data.Age}**";

      private string WhitespaceIfEmpty(string text) => !string.IsNullOrEmpty(text) ? text : " ";

      private bool IsUnique(string email) => !email.EndsWith("example.org");
   }
}