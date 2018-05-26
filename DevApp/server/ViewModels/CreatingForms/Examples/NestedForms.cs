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
            .WithAttribute(this, new { Label = "Register" })
            .SubscribedBy(
               AddProperty<string>("ServerResponse"), submittedData => Save(submittedData))
                  .SubscribedBy(ClearAllForms, _ => true);
      }

      public override void OnSubVMCreated(BaseVM subVM)
      {
         if (subVM is ChildForm_NameEmail)
            (subVM as ChildForm_NameEmail).ClearForm.SubscribeTo(ClearAllForms);
         else if (subVM is ChildForm_Address)
            (subVM as ChildForm_Address).ClearForm.SubscribeTo(ClearAllForms);
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
            .WithAttribute(this, new TextFieldAttribute { Label = "Name:", Placeholder = "Enter name" })
            .WithRequiredValidation(this)
            .SubscribeTo(ClearForm.Select(_ => ""));

         AddProperty<string>("Email")
            .WithAttribute(this, new TextFieldAttribute { Label = "Email:", Placeholder = "Enter email" })
            .WithPatternValidation(this, Pattern.Email, "Must be a valid email address.")
            .SubscribeTo(ClearForm.Select(_ => ""));
      }
   }

   public class ChildForm_Address : BaseVM
   {
      public ReactiveProperty<bool> ClearForm { get; } = new ReactiveProperty<bool>();

      public ChildForm_Address()
      {
         AddProperty<string>("Address")
            .WithAttribute(this, new TextFieldAttribute { Label = "Address:", Placeholder = "Enter street address" })
            .WithRequiredValidation(this)
            .SubscribeTo(ClearForm.Select(_ => ""));

         AddProperty<string>("City")
            .WithAttribute(this, new TextFieldAttribute { Label = "City:", Placeholder = "Enter city" })
            .WithRequiredValidation(this)
            .SubscribeTo(ClearForm.Select(_ => ""));

         AddProperty<State>("State")
            .WithAttribute(this, new DropdownListAttribute { Label = "State:", Options = typeof(State).ToDescriptions() })
            .WithRequiredValidation(this)
            .SubscribeTo(ClearForm.Select(_ => State.Unknown));
      }
   }
}