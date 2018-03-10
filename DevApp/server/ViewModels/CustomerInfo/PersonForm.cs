using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class PersonForm : BaseVM
   {
      private readonly ReactiveProperty<Customer> _customer = new ReactiveProperty<Customer>();

      public ReactiveProperty<Customer> Customer => _customer;

      public PersonForm()
      {
         AddProperty<string>("FullName")
            .WithAttribute(this, new TextFieldAttribute { Label = "Name:" })
            .SubscribeTo(_customer.Select(x => x.Name.FullName));

         AddProperty<NamePrefix>("Prefix")
            .WithAttribute(this, new DropdownListAttribute { Label = "Prefix:", Options = typeof(NamePrefix).ToDescriptions() })
            .SubscribeTo(_customer.Select(x => x.Name.Prefix));

         AddProperty<string>("FirstName")
            .WithAttribute(this, new TextFieldAttribute { Label = "First Name:" })
            .SubscribeTo(_customer.Select(x => x.Name.FirstName));

         AddProperty<string>("MiddleName")
            .WithAttribute(this, new TextFieldAttribute { Label = "Middle Name:" })
            .SubscribeTo(_customer.Select(x => x.Name.MiddleName));

         AddProperty<string>("LastName")
            .WithAttribute(this, new TextFieldAttribute { Label = "Last Name:" })
            .SubscribeTo(_customer.Select(x => x.Name.LastName));

         AddProperty<NameSuffix>("Suffix")
            .WithAttribute(this, new DropdownListAttribute { Label = "Suffix:", Options = typeof(NameSuffix).ToDescriptions() })
            .SubscribeTo(_customer.Select(x => x.Name.Suffix));
      }
   }
}
