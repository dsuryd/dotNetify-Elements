/* 
Copyright 2018 Dicky Suryadi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

namespace DotNetify.Elements
{
   /// <summary>
   /// Regular expression pattern for input validation.
   /// </summary>
   public static class Pattern
   {
      public const string Email = @"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

      public const string Digit = @"^[0-9]+$";

      public const string Currency = @"^[0-9]+(\.\[0-9]+)?$";

      public const string Number = @"^[-+]?\[0-9]+(\.\[0-9]+)?$";

      public const string Alphabet = @"^[a-zA-Z]*$";

      public const string Alphanumeric = @"^[a-zA-Z0-9]+$";

      public const string URL = @"^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$";

      public const string USPhoneNumber = @"^((([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+)*$";

      public const string USZipCode = @"^([0-9]{5}(?:-[0-9]{4})?)*$";

      public const string IPAddress = @"^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$";

      public const string USSocialSecurityNumber = @"[0-9]{3}-[0-9]{2}-[0-9]{4}$";
   }
}
