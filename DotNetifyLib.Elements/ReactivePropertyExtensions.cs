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
using System.Collections.Generic;
using System.Linq;

namespace DotNetify
{
   public static class ReactivePropertyExtensions
   {
      public static ReactiveProperty<TSource> SubscribedBy<TSource, TTarget>(this ReactiveProperty<TSource> prop,
         ReactiveProperty<TTarget> subscriber, Func<IObservable<TSource>, IObservable<TTarget>> mapper)
      {
         subscriber.SubscribeTo(mapper(prop));
         return prop;
      }

      public static ReactiveProperty<TProp> WithAttribute<TProp, TAttr>(this ReactiveProperty<TProp> prop, IReactiveProperties vm, TAttr attr)
      {
         var attrName = $"{prop.Name}_attr";
         if (vm.RuntimeProperties.FirstOrDefault(x => x.Name == attrName) != null)
            throw new Exception($"{prop.Name} already has an attribute");

         vm.AddProperty(attrName, attr);
         return prop;
      }

      #region Validations

      public static ReactiveProperty<TProp> WithValidation<TProp>(this ReactiveProperty<TProp> prop, IReactiveProperties vm, Validation validation)
      {
         var validationName = $"{prop.Name}_validate";
         var validationProp = vm.RuntimeProperties.FirstOrDefault(x => x.Name == validationName);

         List<Validation> validationEntries = null;
         if (validationProp != null && validationProp.Value is List<Validation>)
            validationEntries = validationProp.Value as List<Validation>;
         else
         {
            validationEntries = new List<Validation>();
            vm.AddProperty(validationName, validationEntries);
         }
         validationEntries.Add(validation);
         return prop;
      }

      public static ReactiveProperty<TProp> WithRequiredValidation<TProp>(this ReactiveProperty<TProp> prop, IReactiveProperties vm, string message)
      {
         return prop.WithValidation(vm, new RequiredValidation(message));
      }

      public static ReactiveProperty<TProp> WithPatternValidation<TProp>(this ReactiveProperty<TProp> prop, IReactiveProperties vm, string regexPattern, string message)
      {
         return prop.WithValidation(vm, new PatternValidation(regexPattern, message));
      }

      #endregion
   }
}
