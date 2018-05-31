using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class DriverLicenseForm : BaseVM
   {
      public ReactiveProperty<Customer> Customer { get; } = new ReactiveProperty<Customer>();

      public DriverLicenseForm()
      {
         AddProperty<string>(nameof(DriverLicenseInfo.Number))
            .WithAttribute(new TextFieldAttribute { Label = "Number:" })
            .SubscribeTo(Customer.Select(x => x.DriverLicense.Number));

         AddProperty<State>(nameof(DriverLicenseInfo.State))
            .WithAttribute(new DropdownListAttribute { Label = "State:", Options = typeof(State).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.DriverLicense.State));
      }
   }
}