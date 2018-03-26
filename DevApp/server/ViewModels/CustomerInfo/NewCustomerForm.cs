using DotNetify;
using DotNetify.Elements;
using System.Linq;
using System.Reactive.Linq;

namespace dotNetify_Elements
{
   public class NewCustomerForm : BaseVM
   {
      internal ICustomerRepository CustomerRepository { get; set; }

      public ReactiveProperty<Customer> NewCustomer { get; } = new ReactiveProperty<Customer>();

      public NewCustomerForm()
      {
         AddProperty<FormData>("Submit")
            .SubscribedBy(NewCustomer, x => x.Select(formData => Save(formData)));
      }

      public override void Dispose()
      {
         base.Dispose();
      }

      public Customer Save(FormData formData)
      {
         return CustomerRepository.Add(formData.Person, formData.Phone,
            formData.OtherInfo, formData.DriverLicense, formData.Notes);
      }
   }
}