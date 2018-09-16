using System.Collections.Generic;

namespace dotNetify_Elements
{
   using StringDictionary = Dictionary<string, string>;

   public class CustomerFormData
   {
      public StringDictionary Person { get; set; }
      public StringDictionary Phone { get; set; }
      public StringDictionary Address { get; set; }
      public StringDictionary OtherInfo { get; set; }
      public StringDictionary DriverLicense { get; set; }
      public StringDictionary Notes { get; set; }
   }
}