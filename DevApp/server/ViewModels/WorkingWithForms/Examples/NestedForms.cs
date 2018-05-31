using DotNetify;
using DotNetify.Elements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;

namespace dotNetify_Elements
{
   using StringDictionary = Dictionary<string, string>;

   public class MasterForm : BaseVM
   {
      private class FormData
      {
         public StringDictionary NameEmail { get; set; }
         public StringDictionary Address { get; set; }
      }

      public ReactiveProperty<bool> ClearAllForms { get; } = new ReactiveProperty<bool>();

      public MasterForm()
      {
         AddProperty<FormData>("Register")
            .WithAttribute(new { Label = "Register" })
            .SubscribedBy(
               AddProperty<string>("ServerResponse"), submittedData => Save(submittedData))
                  .SubscribedBy(ClearAllForms, _ => true);
      }

      public override void OnSubVMCreated(BaseVM subVM)
      {
         (subVM as ChildForm_NameEmail)?.ClearForm.SubscribeTo(ClearAllForms);
         (subVM as ChildForm_Address)?.ClearForm.SubscribeTo(ClearAllForms);
      }

      private string Save(FormData formData)
      {
         return
            $"Name: {formData.NameEmail["Name"]}<br/>" +
            $"Email: {formData.NameEmail["Email"]}<br/>" +
            $"Address: {formData.Address["Address"]}<br/>" +
            $"City: {formData.Address["City"]}<br/>" +
            $"State: {Enum.Parse(typeof(State), formData.Address["State"])}";
      }
   }

   public class ChildForm_NameEmail : BaseVM
   {
      public ReactiveProperty<bool> ClearForm { get; } = new ReactiveProperty<bool>();

      public ChildForm_NameEmail()
      {
         AddProperty<string>("Name")
            .WithAttribute(new TextFieldAttribute { Label = "Name:", Placeholder = "Enter name" })
            .WithRequiredValidation()
            .SubscribeTo(ClearForm.Select(_ => ""));

         AddProperty<string>("Email")
            .WithAttribute(new TextFieldAttribute { Label = "Email:", Placeholder = "Enter email" })
            .WithPatternValidation(Pattern.Email, "Must be a valid email address.")
            .SubscribeTo(ClearForm.Select(_ => ""));
      }
   }

   public class ChildForm_Address : BaseVM
   {
      public ReactiveProperty<bool> ClearForm { get; } = new ReactiveProperty<bool>();

      public ChildForm_Address()
      {
         AddProperty<string>("Address")
            .WithAttribute(new TextFieldAttribute { Label = "Address:", Placeholder = "Enter street address" })
            .WithRequiredValidation()
            .SubscribeTo(ClearForm.Select(_ => ""));

         AddProperty<string>("City")
            .WithAttribute(new TextFieldAttribute { Label = "City:", Placeholder = "Enter city" })
            .WithRequiredValidation()
            .SubscribeTo(ClearForm.Select(_ => ""));

         AddProperty<State>("State")
            .WithAttribute(new DropdownListAttribute
            {
               Label = "State:",
               Placeholder = "Enter state",
               Options = typeof(State).ToDescriptions()
            })
            .WithRequiredValidation()
            .SubscribeTo(ClearForm.Select(_ => State.Unknown));
      }
   }
}