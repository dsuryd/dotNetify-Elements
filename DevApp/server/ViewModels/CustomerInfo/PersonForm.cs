using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class PersonForm : BaseVM
   {
      public ReactiveProperty<Customer> Customer { get; } = new ReactiveProperty<Customer>();

      public PersonForm()
      {
         AddProperty<string>("FullName")
            .WithAttribute(this, new TextFieldAttribute { Label = "Name:" })
            .SubscribeTo(Customer.Select(x => x.Name.FullName));

         AddProperty<NamePrefix>("Prefix")
            .WithAttribute(this, new DropdownListAttribute { Label = "Prefix:", Options = typeof(NamePrefix).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.Name.Prefix));

         AddProperty<string>("FirstName")
            .WithAttribute(this, new TextFieldAttribute { Label = "First Name:" })
            .SubscribeTo(Customer.Select(x => x.Name.FirstName));

         AddProperty<string>("MiddleName")
            .WithAttribute(this, new TextFieldAttribute { Label = "Middle Name:" })
            .SubscribeTo(Customer.Select(x => x.Name.MiddleName));

         AddProperty<string>("LastName")
            .WithAttribute(this, new TextFieldAttribute { Label = "Last Name:" })
            .SubscribeTo(Customer.Select(x => x.Name.LastName));

         AddProperty<NameSuffix>("Suffix")
            .WithAttribute(this, new DropdownListAttribute { Label = "Suffix:", Options = typeof(NameSuffix).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.Name.Suffix));
      }
   }
}
