using Bogus;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading;

namespace dotNetify_Elements
{
   using StringDictionary = Dictionary<string, string>;

   public interface ICustomerRepository
   {
      IEnumerable<Customer> GetAll();

      Customer Get(int id);

      Customer Add(FormData formData);

      Customer Update(int id, FormData formData);
   }

   public class CustomerRepository : ICustomerRepository
   {
      private IList<Customer> _mockData = GenerateMockData();

      public IEnumerable<Customer> GetAll() => _mockData;

      public Customer Get(int id) => _mockData.FirstOrDefault(x => x.Id == id);

      public Customer Add(FormData formData)
      {
         var customer = new Customer
         {
            Id = _mockData.Max(x => x.Id) + 1,
            Name = new NameInfo(),
            Address = new AddressInfo(),
            Phone = new PhoneInfo(),
            OtherInfo = new OtherInfo(),
            Company = new CompanyInfo(),
            DriverLicense = new DriverLicenseInfo(),
            Notes = string.Empty
         };

         Update(customer.Name, formData.Person);
         Update(customer.Address, formData.Address);
         Update(customer.Phone, formData.Phone);
         Update(customer.OtherInfo, formData.OtherInfo);
         Update(customer.DriverLicense, formData.DriverLicense);

         _mockData.Add(customer);
         return customer;
      }

      public Customer Update(int id, FormData formData)
      {
         var customer = Get(id);

         Update(customer.Name, formData.Person);
         Update(customer.Address, formData.Address);
         Update(customer.Phone, formData.Phone);
         Update(customer.OtherInfo, formData.OtherInfo);
         Update(customer.DriverLicense, formData.DriverLicense);
         customer.Notes = formData.Notes != null ? formData.Notes[nameof(FormData.Notes)] : customer.Notes;

         return customer;
      }

      private void Update(object record, StringDictionary newValues)
      {
         if (newValues != null)
            foreach (var prop in record.GetType().GetProperties().Where(prop => newValues.ContainsKey(prop.Name)))
               prop.SetValue(record, TypeDescriptor.GetConverter(prop.PropertyType).ConvertFromString(newValues[prop.Name]));
      }

      private static IList<Customer> GenerateMockData()
      {
         int id = 0;
         return new Faker<Customer>()
            .CustomInstantiator(f => new Customer { Id = ++id })
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
               ZipCode = f.Address.ZipCode("#####")
            })
            .RuleFor(o => o.Phone, f => new PhoneInfo
            {
               Work = f.Phone.PhoneNumber("(###) ###-####"),
               Primary = f.PickRandomWithout(PrimaryPhone.None),
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
            .RuleFor(o => o.OtherInfo, f => new OtherInfo
            {
               DateOfBirth = f.Person.DateOfBirth,
               Gender = f.Person.Gender == Bogus.DataSets.Name.Gender.Male ? Gender.Male : Gender.Female,
               MaritalStatus = f.PickRandomWithout(MaritalStatus.Unknown),
               TaxFilingStatus = f.PickRandomWithout(TaxFilingStatus.None),
               SSN = new Randomizer().Replace("###-##-####")
            })
            .Generate(100);
      }
   }
}