using DotNetify;
using DotNetify.Elements;
using System.Linq;
using System.Reactive.Linq;

namespace dotNetify_Elements
{
   public class NewCustomerForm : BaseVM
   {
      private readonly ICustomerRepository _customerRepository;

      public ReactiveProperty<Customer> NewCustomer { get; } = new ReactiveProperty<Customer>();

      public NewCustomerForm(ICustomerRepository customerRepository)
      {
         _customerRepository = customerRepository;

         AddInternalProperty<FormData>("Submit")
            .SubscribedBy(NewCustomer, formData => Save(formData));
      }

      public override void Dispose()
      {
         base.Dispose();
      }

      public Customer Save(FormData formData)
      {
         return _customerRepository.Add(formData);
      }
   }
}