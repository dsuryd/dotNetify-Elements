using Bogus;
using System;
using System.Linq;
using System.Collections.Generic;

namespace dotNetify_Elements
{
   public interface ICustomerRepository
   {
      IReadOnlyList<Customer> GetAll();
      Customer Get(string id);
   }

   public class CustomerRepository : ICustomerRepository
   {
      private IReadOnlyList<Customer> _mockData = GenerateMockData();

      public IReadOnlyList<Customer> GetAll() => _mockData;
      public Customer Get(string id) => _mockData.FirstOrDefault(x => x.Id.ToString() == id);

      private static IReadOnlyList<Customer> GenerateMockData()
      {
         int id = 1;

         return new Faker<Customer>()
            .CustomInstantiator(f => new Customer { Id = id++ })
            .RuleFor(o => o.Name, f => new NameInfo
            {
               FirstName = f.Person.FirstName,
               LastName = f.Person.LastName,
            })
            .RuleFor(o => o.Address, f => new AddressInfo
            {
               Address1 = f.Address.StreetAddress(),
               Address2 = f.Address.SecondaryAddress(),
               City = f.Address.City(),
               State = (State)Enum.Parse(typeof(State), f.Address.StateAbbr()),
               Zipcode = f.Address.ZipCode("#####")
            })
            .RuleFor(o => o.Phone, f => new PhoneInfo
            {
               Work = f.Phone.PhoneNumber("(###) ###-####"),
               Primary = PrimaryPhone.Work
            })
            .RuleFor(o => o.Company, f => new CompanyInfo
            {
               Occupation = f.Name.JobTitle(),
               Organization = f.Company.CompanyName()
            })
            .RuleFor(o => o.DriverLicense, f => new DriverLicenseInfo
            {
               State = (State)Enum.Parse(typeof(State), f.Address.StateAbbr()),
               Number = f.Finance.Account()
            })
            .Generate(100);
      }
   }
}
