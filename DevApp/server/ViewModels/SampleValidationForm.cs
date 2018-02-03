using System;
using System.Collections.Generic;
using System.Linq;
using DotNetify;
using System.Reactive.Linq;
using Newtonsoft.Json;

namespace dotNetify_Elements
{
   public class SampleValidationForm : BaseVM
   {
      public class FormData
      {
         public string Name { get; set; }
         public string Email { get; set; }
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

         AddProperty<bool>("IsSubmitted")
            .SubscribeTo(
               AddProperty<Action<FormData>>("Submit").Select(value =>
               {
                  System.Diagnostics.Trace.WriteLine(JsonConvert.SerializeObject(value));
                  return true;
               })
         );

      }
   }
}