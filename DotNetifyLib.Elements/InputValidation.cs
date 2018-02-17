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

using System;

namespace DotNetify.Elements
{
   public abstract class Validation
   {
      public enum Categories
      {
         Error,
         Warning
      }

      public string Type { get; set; }
      public string Message { get; set; }
      public string Category { get; set; }

      public Validation(string message, Categories category)
      {
         Message = message;
         Category = category.ToString();
         Type = GetType().Name.Replace(nameof(Validation), "");
      }
   }

   public class PatternValidation : Validation
   {
      public string Pattern { get; set; }

      public PatternValidation(string pattern, string message, Categories category = Categories.Error) : base(message, category)
      {
         Pattern = pattern;
      }
   }

   public class RangeValidation<T> : Validation where T : struct
   {
      public T? Min { get; set; }
      public T? Max { get; set; }

      public RangeValidation(T? min, T? max, string message, Categories category = Categories.Error) : base(message, category)
      {
         Min = min;
         Max = max;
         Type = "Range";
      }
   }

   public class RequiredValidation : Validation
   {
      public RequiredValidation(string message) : base(message, Categories.Error) { }
   }

   public class ServerValidation<TValue> : Validation
   {
      public Func<TValue, bool> Validate { get; set; }

      public ServerValidation(Func<TValue, bool> validate, string message, Categories category = Categories.Error) : base(message, category)
      {
         Validate = validate;
      }
   }

   internal class ServerValidation : Validation
   {
      public string Id { get; set; }

      public ServerValidation(string message, Categories category = Categories.Error) : base(message, category)
      {
         // Generate a unique Id for every server validation.
         Id = GetHashCode().ToString("x");
      }
   }
}
