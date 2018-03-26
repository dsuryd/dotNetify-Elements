using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetify;

namespace dotNetify_Elements
{
   using StringDictionary = Dictionary<string, string>;

   public class FormData
   {
      public StringDictionary Person { get; set; }
      public StringDictionary Phone { get; set; }
      public StringDictionary OtherInfo { get; set; }
      public StringDictionary DriverLicense { get; set; }
      public StringDictionary Notes { get; set; }
   }
}