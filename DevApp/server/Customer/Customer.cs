using System;
using System.ComponentModel;

namespace dotNetify_Elements
{
   #region Enums

   public enum NamePrefix
   {
      [Description("")] None,
      [Description("Mr.")] Mr,
      [Description("Mrs.")] Mrs,
      [Description("Ms.")] Ms
   }

   public enum NameSuffix
   {
      [Description("")] None,
      [Description("Jr.")] Jr,
      [Description("Sr.")] Sr,
      [Description("II")] Second,
      [Description("III")] Third,
      [Description("IV")] Fourth
   }

   public enum PrimaryPhone
   {
      [Description("")] None,
      [Description("Work")] Work,
      [Description("Home")] Home,
      [Description("Mobile")] Mobile
   }

   public enum TaxFilingStatus
   {
      [Description("")] None,
      [Description("Single")] Single,
      [Description("Married Filing Jointly")] MarriedFilingJointly,
      [Description("Married Filing Separately")] MarriedFilingSeparately,
      [Description("Head of Household")] HeadOfHousehold,
      [Description("Qualifying Widow/er with Dependent Child")] QualifingWidowWithChild
   }

   public enum Gender
   {
      [Description("")] Unknown,
      [Description("Male")] Male,
      [Description("Female")] Female
   }

   public enum MaritalStatus
   {
      [Description("")] Unknown,
      [Description("Never Married")] NeverMarried,
      [Description("Married")] Married,
      [Description("Divorced")] Divorced,
      [Description("Separated")] Separated,
      [Description("Widowed")] Widowed
   }

   public enum State
   {
      [Description("")] Unknown,
      [Description("Alabama")] AL, [Description("Alaska")] AK, [Description("Arkansas")] AR, [Description("Arizona")] AZ,
      [Description("California")] CA, [Description("Colorado")] CO, [Description("Connecticut")] CT, [Description("D.C.")] DC,
      [Description("Delaware")] DE, [Description("Florida")] FL, [Description("Georgia")] GA, [Description("Hawaii")] HI,
      [Description("Iowa")] IA, [Description("Idaho")] ID, [Description("Illinois")] IL, [Description("Indiana")] IN,
      [Description("Kansas")] KS, [Description("Kentucky")] KY, [Description("Louisiana")] LA, [Description("Massachusetts")] MA,
      [Description("Maryland")] MD, [Description("Maine")] ME, [Description("Michigan")] MI, [Description("Minnesota")] MN,
      [Description("Missouri")] MO, [Description("Mississippi")] MS, [Description("Montana")] MT, [Description("North Carolina")] NC,
      [Description("North Dakota")] ND, [Description("Nebraska")] NE, [Description("New Hampshire")] NH, [Description("New Jersey")] NJ,
      [Description("New Mexico")] NM, [Description("Nevada")] NV, [Description("New York")] NY, [Description("Oklahoma")] OK,
      [Description("Ohio")] OH, [Description("Oregon")] OR, [Description("Pennsylvania")] PA, [Description("Rhode Island")] RI,
      [Description("South Carolina")] SC, [Description("South Dakota")] SD, [Description("Tennessee")] TN, [Description("Texas")] TX,
      [Description("Utah")] UT, [Description("Virginia")] VA, [Description("Vermont")] VT, [Description("Washington")] WA,
      [Description("Wisconsin")] WI, [Description("West Virginia")] WV, [Description("Wyoming")] WY
   }

   #endregion Enums

   public class Customer
   {
      public int Id { get; set; }
      public NameInfo Name { get; set; }
      public AddressInfo Address { get; set; }
      public PhoneInfo Phone { get; set; }
      public CompanyInfo Company { get; set; }
      public DriverLicenseInfo DriverLicense { get; set; }
      public OtherInfo OtherInfo { get; set; }
      public string Notes { get; set; }
   }

   public class NameInfo
   {
      public NamePrefix Prefix { get; set; }
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public string MiddleName { get; set; }
      public NameSuffix Suffix { get; set; }

      public string FullName => $"{FirstName} {LastName}";
   }

   public class AddressInfo
   {
      public string Address1 { get; set; }
      public string Address2 { get; set; }
      public string City { get; set; }
      public State State { get; set; }
      public string ZipCode { get; set; }

      public string StreetAddress => $"{Address1} {Address2}".TrimEnd();
   }

   public class PhoneInfo
   {
      public string Work { get; set; }
      public string Home { get; set; }
      public string Mobile { get; set; }
      public PrimaryPhone Primary { get; set; }

      public string PrimaryNumber => Primary == PrimaryPhone.Work ? Work : Primary == PrimaryPhone.Home ? Home : Mobile;
   }

   public class CompanyInfo
   {
      public string Occupation { get; set; }
      public string Organization { get; set; }
   }

   public class OtherInfo
   {
      public string SSN { get; set; }
      public TaxFilingStatus TaxFilingStatus { get; set; }
      public DateTimeOffset DateOfBirth { get; set; }
      public Gender Gender { get; set; }
      public MaritalStatus MaritalStatus { get; set; }
   }

   public class DriverLicenseInfo
   {
      public string Number { get; set; }
      public State State { get; set; }
   }
}