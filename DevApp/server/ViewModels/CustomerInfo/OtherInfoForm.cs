using System;
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class OtherInfoForm : BaseVM
   {
      public ReactiveProperty<Customer> Customer { get; } = new ReactiveProperty<Customer>();

      public OtherInfoForm()
      {
         AddProperty<string>("SSN")
            .WithAttribute(this, new TextFieldAttribute { Label = "SSN:", Mask = "999-99-9999" })
            .WithPatternValidation(this, Pattern.USSocialSecurityNumber)
            .SubscribeTo(Customer.Select(x => x.OtherInfo.SSN));

         AddProperty<TaxFilingStatus>("TaxFilingStatus")
            .WithAttribute(this, new DropdownListAttribute { Label = "Tax Filing Status:", Options = typeof(TaxFilingStatus).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.OtherInfo.TaxFilingStatus));

         AddProperty<DateTimeOffset>("DateOfBirth")
            .WithAttribute(this, new DateFieldAttribute { Label = "Date Of Birth:" })
            .SubscribeTo(Customer.Select(x => x.OtherInfo.DateOfBirth));

         AddProperty<Gender>("Gender")
            .WithAttribute(this, new RadioGroupAttribute { Label = "Gender:", Options = typeof(Gender).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.OtherInfo.Gender));

         AddProperty<MaritalStatus>("MaritalStatus")
            .WithAttribute(this, new DropdownListAttribute { Label = "Marital Status:", Options = typeof(MaritalStatus).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.OtherInfo.MaritalStatus));
      }
   }
}
