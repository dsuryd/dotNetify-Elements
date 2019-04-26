using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotNetify.Client.Blazor
{
   public class VMContextStore : ViewState
   {
      private readonly IDotNetifyClient _dotNetifyClient;

      public string VMId { get; }
      public Dictionary<string, object> State { get; } = new Dictionary<string, object>();

      /// <summary>
      /// Occurs when the state has changed.
      /// </summary>
      public EventHandler<string> Changed;

      public VMContextStore(string vmId, IDotNetifyClient dotNetifyClient) : base(new object())
      {
         VMId = vmId;
         _dotNetifyClient = dotNetifyClient;
      }

      public async Task DispatchStateAsync(string key, string value, bool toServer)
      {
         await _dotNetifyClient.DispatchAsync(key, value);
      }

      public VMProperty GetVMProperty(string id, Type attributeType)
      {
         if (!State.ContainsKey(id))
            throw new KeyNotFoundException($"Property '{id}' not found in '{VMId}'.");

         return new VMProperty(id, this, attributeType);
      }

      public void Set(string key, object value)
      {
         State[key] = value;
         Changed?.Invoke(this, key);
      }

      public override string ToString() => JsonConvert.SerializeObject(State);

      #region ViewState members

      public override T Get<T>(string name) => State.ContainsKey(name) ? (T)State[name] : default(T);

      public override bool HasProperty(string name) => State.ContainsKey(name);

      public override void Set(Dictionary<string, object> states)
      {
         foreach (var state in states)
            State[state.Key] = state.Value;
         Changed?.Invoke(this, null);
      }

      #endregion ViewState members
   }
}