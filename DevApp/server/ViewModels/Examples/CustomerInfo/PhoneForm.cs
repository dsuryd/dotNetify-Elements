using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class PhoneForm : BaseVM
   {
      public ReactiveProperty<Customer> Customer { get; } = new ReactiveProperty<Customer>();

      public PhoneForm()
      {
         AddProperty<string>(nameof(PhoneInfo.Work))
            .WithAttribute(this, new TextFieldAttribute { Label = "Work:", Mask = "(999) 999-9999" })
            .WithPatternValidation(this, Pattern.USPhoneNumber)
            .SubscribeTo(Customer.Select(x => x.Phone.Work));

         AddProperty<string>(nameof(PhoneInfo.Home))
            .WithAttribute(this, new TextFieldAttribute { Label = "Home:", Mask = "(999) 999-9999" })
            .WithPatternValidation(this, Pattern.USPhoneNumber)
            .SubscribeTo(Customer.Select(x => x.Phone.Home));

         AddProperty<string>(nameof(PhoneInfo.Mobile))
            .WithAttribute(this, new TextFieldAttribute { Label = "Mobile:", Mask = "(999) 999-9999" })
            .WithPatternValidation(this, Pattern.USPhoneNumber)
            .SubscribeTo(Customer.Select(x => x.Phone.Mobile));

         AddProperty<PrimaryPhone>(nameof(PhoneInfo.Primary))
            .WithAttribute(this, new DropdownListAttribute { Label = "Primary Phone:", Options = typeof(PrimaryPhone).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.Phone.Primary));
      }
   }
}