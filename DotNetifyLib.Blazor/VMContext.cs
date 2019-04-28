using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace DotNetify.Blazor
{
   public interface IVMContext<T>
   {
      event EventHandler<T> StateChanged;

      Task InitAsync(ElementRef elementRef);
   }

   public class VMContext<T> : IVMContext<T>
   {
      private IJSRuntime _jsRuntime;
      private JsCallback _jsCallback;

      public event EventHandler<T> StateChanged;

      public VMContext(IJSRuntime jsRuntime)
      {
         _jsRuntime = jsRuntime;
         _jsCallback = new JsCallback(arg => Callback(arg));
      }

      public Task InitAsync(ElementRef vmContextElementRef)
      {
         return _jsRuntime.InvokeAsync<object>("dotnetify_blazor.addEventListener", vmContextElementRef, "onStateChange", new DotNetObjectRef(_jsCallback));
      }

      private void Callback(object arg)
      {
         try
         {
            T eventArg = typeof(T) == typeof(string) ? (T)(object)$"{arg}" : JsonConvert.DeserializeObject<T>($"{arg}");
            StateChanged?.Invoke(this, eventArg);
         }
         catch (Exception ex)
         {
            throw new JsonSerializationException($"Cannot deserialize {arg} to {typeof(T)}", ex);
         }
      }
   }
}