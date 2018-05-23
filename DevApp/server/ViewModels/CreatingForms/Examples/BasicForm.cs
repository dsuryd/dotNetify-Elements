using DotNetify;
using DotNetify.Elements;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;

namespace dotNetify_Elements
{
   public class BasicForm : BaseVM
   {
      public enum Gender { NotSpecified, Male, Female }

      private class FormData
      {
         public string Name { get; set; }
         public Gender Gender { get; set; }
      }

      public BasicForm()
      {
         AddProperty<string>("Name")
            .WithAttribute(this, new TextFieldAttribute
            {
               Label = "Name:",
               Placeholder = "Enter your name (required)"
            })
            .WithRequiredValidation(this);

         AddProperty<Gender>("Gender")
            .WithAttribute(this, new DropdownListAttribute
            {
               Label = "Gender:",
               Placeholder = "Select your gender...",
               Options = new Dictionary<Gender, string>
               {
                  { Gender.NotSpecified, "" },
                  { Gender.Male, "Male" },
                  { Gender.Female, "Female" }
               }
               .Select(kvp => KeyValuePair.Create($"{(int)kvp.Key}", kvp.Value))
               .ToArray()
            });

         AddProperty<FormData>("Submit")
            .WithAttribute(this, new { Label = "Submit" })
            .SubscribedBy(
               AddProperty<string>("SubmitFeedback"), submittedData => Save(submittedData));
      }

      private string Save(FormData data) => $"The name __'{data.Name}'__ of gender __'{data.Gender}'__ was received.";
   }
}