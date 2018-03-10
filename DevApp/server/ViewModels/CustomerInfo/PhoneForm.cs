using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class PhoneForm : BaseVM
   {
      private readonly ReactiveProperty<Customer> _customer = new ReactiveProperty<Customer>();

      public ReactiveProperty<Customer> Customer => _customer;

      public PhoneForm()
      {
         AddProperty<string>("Work")
            .WithAttribute(this, new TextFieldAttribute { Label = "Work:", Mask = "(999) 999-9999" })
            .WithPatternValidation(this, Pattern.USPhoneNumber)
            .SubscribeTo(_customer.Select(x => x.Phone.Work));

         AddProperty<string>("Home")
            .WithAttribute(this, new TextFieldAttribute { Label = "Home:", Mask = "(999) 999-9999" })
            .WithPatternValidation(this, Pattern.USPhoneNumber)
            .SubscribeTo(_customer.Select(x => x.Phone.Home));

         AddProperty<string>("Mobile")
            .WithAttribute(this, new TextFieldAttribute { Label = "Mobile:", Mask = "(999) 999-9999" })
            .WithPatternValidation(this, Pattern.USPhoneNumber)
            .SubscribeTo(_customer.Select(x => x.Phone.Mobile));

         AddProperty<PrimaryPhone>("PrimaryPhone")
            .WithAttribute(this, new DropdownListAttribute { Label = "Primary Phone:", Options = typeof(PrimaryPhone).ToDescriptions() })
            .SubscribeTo(_customer.Select(x => x.Phone.Primary));
      }
   }
}
