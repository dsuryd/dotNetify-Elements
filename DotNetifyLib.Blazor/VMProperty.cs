using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace DotNetify.Client.Blazor
{
   public class VMProperty
   {
      private readonly VMContextStore _vmContextStore;

      protected Dictionary<string, object> VMState { get; }

      public string Id { get; }

      public string FullId { get; }

      public object Attribute { get; }

      public string Value
      {
         get => VMState.ContainsKey(Id) ? VMState[Id]?.ToString() : null;
         set => _vmContextStore.Set(Id, value);
      }

      public VMProperty(string id, VMContextStore vmContextStore, Type attributeType)
      {
         _vmContextStore = vmContextStore;

         Id = id;
         FullId = $"{vmContextStore.VMId}.{Id}";
         Attribute = GetAttribute(id, attributeType, vmContextStore.State);
         VMState = vmContextStore.State;
      }

      public async Task DispatchAsync(string value, bool toServer = true)
      {
         await _vmContextStore.DispatchStateAsync(Id, value, toServer);
      }

      private object GetAttribute(string id, Type attributeType, Dictionary<string, object> vmState)
      {
         object attribute = Activator.CreateInstance(attributeType);

         string attrName = GetAttributeName(id);
         if (string.IsNullOrEmpty(id) || !vmState.ContainsKey(attrName) || vmState[attrName] == null)
            return attribute;

         var attrValues = JsonConvert.DeserializeObject<Dictionary<string, string>>(vmState[attrName].ToString());

         foreach (PropertyInfo prop in attributeType.GetProperties().Where(prop => attrValues.ContainsKey(prop.Name)))
            prop.SetValue(attribute, attrValues[prop.Name]);

         return attribute;
      }

      private string GetAttributeName(string id) => $"{id}__attr";

      private string GetValidationName(string id) => $"{id}__validation";
   }
}