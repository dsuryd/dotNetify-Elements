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
using System.Reactive.Linq;

namespace DotNetify.Elements
{
   using AttributeDictionary = Dictionary<string, object>;

   public static class ReactivePropertyExtensions
   {
      /// <summary>
      /// Initiates subscription to a reactive property.
      /// </summary>
      /// <param name="prop">Property to subscribe to.</param>
      /// <param name="subscriber">Subscriber.</param>
      /// <param name="mapper">Function to map the property's data type to the subscriber's.</param>
      /// <returns>Property.</returns>
      public static ReactiveProperty<TSource> SubscribedBy<TSource, TTarget>(this ReactiveProperty<TSource> prop,
         ReactiveProperty<TTarget> subscriber, Func<IObservable<TSource>, IObservable<TTarget>> mapper)
      {
         subscriber.SubscribeTo(mapper(prop));
         return prop;
      }

      /// <summary>
      /// Includes attribute metadata to a reactive property.
      /// </summary>
      /// <param name="prop">Property to include.</param>
      /// <param name="vm">View model of the property.</param>
      /// <param name="attr">Object that contains the attribute data.</param>
      /// <returns>Property.</returns>
      public static ReactiveProperty<TProp> WithAttribute<TProp, TAttr>(this ReactiveProperty<TProp> prop, IReactiveProperties vm, TAttr attr)
      {
         var attrDictionary = prop.GetAttributes(vm) ?? new AttributeDictionary();

         // Convert the attribute object to key-value dictionary.
         attrDictionary = attrDictionary
             .Concat(attr.GetType().GetProperties().ToDictionary(x => x.Name, x => x.GetValue(attr)))
             .Where(x => x.Value != null)
             .ToDictionary(x => x.Key, x => x.Value);

         // Store the attribute data in a special-purpose property.
         vm.AddProperty(prop.ToAttributeName(), attrDictionary);
         return prop;
      }

      /// <summary>
      /// Includes CRUD item key to a reactive property.
      /// </summary>
      /// <param name="prop">Property to include.</param>
      /// <param name="vm">View model of the property.</param>
      /// <param name="itemKey">Item key.</param>
      /// <returns>Property.</returns>
      public static ReactiveProperty<TProp> WithItemKey<TProp>(this ReactiveProperty<TProp> prop, IReactiveProperties vm, string itemKey)
      {
         vm.AddProperty($"{prop.Name}_itemKey", itemKey);
         return prop;
      }

      #region Validations

      /// <summary>
      /// Includes validation metadata to a reactive property.
      /// </summary>
      /// <param name="prop">Property to include.</param>
      /// <param name="vm">View model of the property.</param>
      /// <param name="validation">Object that contains the validation data.</param>
      /// <returns>Property.</returns>
      public static ReactiveProperty<TProp> WithValidation<TProp>(this ReactiveProperty<TProp> prop, IReactiveProperties vm, Validation validation)
      {
         var validationProp = vm.RuntimeProperties.FirstOrDefault(x => x.Name == prop.ToValidationName());

         List<Validation> validationEntries = null;
         if (validationProp?.Value is List<Validation>)
            validationEntries = validationProp.Value as List<Validation>;
         else
         {
            validationEntries = new List<Validation>();
            vm.AddProperty(prop.ToValidationName(), validationEntries);
         }
         validationEntries.Add(validation);
         return prop;
      }

      /// <summary>
      /// Includes pattern validation metadata to a reactive property.
      /// </summary>
      /// <param name="prop">Property to include.</param>
      /// <param name="vm">View model of the property.</param>
      /// <param name="regexPattern">Regular expression pattern.</param>
      /// <param name="message">Validation message.</param>
      /// <param name="category">Validation category.</param>
      /// <returns>Property.</returns>
      public static ReactiveProperty<TProp> WithPatternValidation<TProp>(this ReactiveProperty<TProp> prop,
         IReactiveProperties vm, string regexPattern, string message = null, Validation.Categories category = Validation.Categories.Error)
      {
         message = message ?? $"{prop.GetLabelAttribute(vm)} must match the pattern '{regexPattern}'";
         return prop.WithValidation(vm, new PatternValidation(regexPattern, message, category));
      }

      /// <summary>
      /// Includes value range validation metadata to a reactive property.
      /// </summary>
      /// <param name="prop">Property to include.</param>
      /// <param name="vm">View model of the property.</param>
      /// <param name="min">Minimum value.</param>
      /// <param name="max">Maximum value.</param>
      /// <param name="message">Validation message.</param>
      /// <param name="category">Validation category.</param>
      /// <returns>Property.</returns>
      public static ReactiveProperty<TProp> WithRangeValidation<TProp, T>(this ReactiveProperty<TProp> prop,
         IReactiveProperties vm, T min, T max, string message = null, Validation.Categories category = Validation.Categories.Error) where T : struct
      {
         message = message ?? $"{prop.GetLabelAttribute(vm)} must be between {min} and {max}";
         return prop.WithValidation(vm, new RangeValidation<T>(min, max, message, category));
      }

      /// <summary>
      /// Includes minimum value validation metadata to a reactive property.
      /// </summary>
      /// <param name="prop">Property to include.</param>
      /// <param name="vm">View model of the property.</param>
      /// <param name="min">Minimum value.</param>
      /// <param name="message">Validation message.</param>
      /// <param name="category">Validation category.</param>
      /// <returns>Property.</returns>
      public static ReactiveProperty<TProp> WithMinValidation<TProp, T>(this ReactiveProperty<TProp> prop,
         IReactiveProperties vm, T min, string message = null, Validation.Categories category = Validation.Categories.Error) where T : struct
      {
         message = message ?? $"{prop.GetLabelAttribute(vm)} must be at least {min}";
         return prop.WithValidation(vm, new RangeValidation<T>(min, null, message, category));
      }

      /// <summary>
      /// Includes maximum value validation metadata to a reactive property.
      /// </summary>
      /// <param name="prop">Property to include.</param>
      /// <param name="vm">View model of the property.</param>
      /// <param name="max">Minimum value.</param>
      /// <param name="message">Validation message.</param>
      /// <param name="category">Validation category.</param>
      /// <returns>Property.</returns>
      public static ReactiveProperty<TProp> WithMaxValidation<TProp, T>(this ReactiveProperty<TProp> prop,
         IReactiveProperties vm, T max, string message = null, Validation.Categories category = Validation.Categories.Error) where T : struct
      {
         message = message ?? $"{prop.GetLabelAttribute(vm)} must be at most {max}";
         return prop.WithValidation(vm, new RangeValidation<T>(null, max, message, category));
      }

      /// <summary>
      /// Includes required validation metadata to a reactive property.
      /// </summary>
      /// <param name="prop">Property to include.</param>
      /// <param name="vm">View model of the property.</param>
      /// <param name="message">Validation message.</param>
      /// <returns>Property.</returns>
      public static ReactiveProperty<TProp> WithRequiredValidation<TProp>(this ReactiveProperty<TProp> prop,
         IReactiveProperties vm, string message = null)
      {
         message = message ?? $"{prop.GetLabelAttribute(vm)} is required";
         return prop.WithValidation(vm, new RequiredValidation(message));
      }

      /// <summary>
      /// Includes server validation metadata to a reactive property.
      /// When this is included, the property value will be sent to the server when it changed.
      /// </summary>
      /// <param name="prop">Property to include.</param>
      /// <param name="vm">View model of the property.</param>
      /// <param name="validate">Validation function.</param>
      /// <param name="message">Validation message.</param>
      /// <param name="category">Validation category.</param>
      /// <returns>Property.</returns>
      public static ReactiveProperty<TProp> WithServerValidation<TProp>(this ReactiveProperty<TProp> prop,
         IReactiveProperties vm, Func<TProp, bool> validate, string message, Validation.Categories category = Validation.Categories.Error)
      {
         var serverValidation = new ServerValidation(message);
         var validationMsgProp = typeof(BaseVM).IsAssignableFrom(vm.GetType()) ?
            (vm as BaseVM).AddProperty<bool>(ToValidationMessageName(prop, serverValidation.Id))
            : vm.AddProperty<bool>(ToValidationMessageName(prop, serverValidation.Id));

         validationMsgProp.SubscribeTo(prop.Select(val => validate(val)));
         return prop.WithValidation(vm, serverValidation);
      }

      #endregion Validations

      #region Private Methods

      private static string ToAttributeName(this IReactiveProperty prop) => $"{prop.Name}__attr";

      private static string ToValidationName(this IReactiveProperty prop) => $"{prop.Name}__validation";

      private static string ToValidationMessageName(this IReactiveProperty prop, string id) => $"{prop.Name}__validation_{id}";

      /// <summary>
      /// Get a property's attribute metadata.
      /// </summary>
      /// <param name="prop">Property.</param>
      /// <param name="vm">View model of the property.</param>
      /// <returns>Attribute values as key-value dictionary.</returns>
      private static AttributeDictionary GetAttributes(this IReactiveProperty prop, IReactiveProperties vm)
      {
         return vm.RuntimeProperties.FirstOrDefault(x => x.Name == prop.ToAttributeName())?.Value as AttributeDictionary ?? null;
      }

      /// <summary>
      /// Find the "Label" attribute value in a property's attribute metadata.
      /// </summary>
      /// <param name="prop">Property.</param>
      /// <param name="vm">View model of the property.</param>
      /// <returns>Label attribute value or empty string if not found.</returns>
      private static string GetLabelAttribute(this IReactiveProperty prop, IReactiveProperties vm)
      {
         var labelKey = nameof(TextFieldAttribute.Label);
         var attrs = prop.GetAttributes(vm);
         return attrs?.ContainsKey(labelKey) == true ? attrs[labelKey]?.ToString().TrimEnd(':') : string.Empty;
      }

      #endregion Private Methods
   }
}