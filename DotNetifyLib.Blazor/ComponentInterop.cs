using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace DotNetify.Blazor
{
   public class ComponentInterop
   {
      protected IJSRuntime _jsRuntime;

      public ComponentInterop(IJSRuntime jsRuntime)
      {
         _jsRuntime = jsRuntime;
      }

      public Task AddEventListenerAsync<TEventArg>(string eventName, ElementRef elementRef, Action<TEventArg> eventHandler)
      {
         var jsCallback = new JsCallback(arg => eventHandler?.Invoke(Callback<TEventArg>(arg)));
         return _jsRuntime.InvokeAsync<object>("dotnetify_blazor.addEventListener", elementRef, eventName, new DotNetObjectRef(jsCallback));
      }

      protected T Callback<T>(object arg)
      {
         try
         {
            return typeof(T) == typeof(string) ? (T)(object)$"{arg}" : JsonConvert.DeserializeObject<T>($"{arg}");
         }
         catch (Exception ex)
         {
            throw new JsonSerializationException($"Cannot deserialize {arg} to {typeof(T)}", ex);
         }
      }
   }
}