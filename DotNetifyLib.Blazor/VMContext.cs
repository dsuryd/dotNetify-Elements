using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotNetify.Blazor
{
   public interface IVMContext<TState>
   {
      event EventHandler<TState> StateChanged;

      Task InitAsync(ElementRef elementRef);

      Task DispatchAsync(string propertyName, object propertyValue = null);
   }

   public class VMContext<TState> : ComponentInterop, IVMContext<TState>
   {
      private ElementRef _vmContextElemRef;
      private bool _init;

      public event EventHandler<TState> StateChanged;

      public VMContext(IJSRuntime jsRuntime) : base(jsRuntime)
      {
      }

      public Task InitAsync(ElementRef vmContextElementRef)
      {
         if (_init) return Task.CompletedTask;

         _init = true;
         _vmContextElemRef = vmContextElementRef;
         return AddEventListenerAsync<TState>("onStateChange", vmContextElementRef, state => StateChanged?.Invoke(this, state));
      }

      public Task DispatchAsync(string propertyName, object propertyValue = null)
      {
         var data = new Dictionary<string, object>() { { propertyName, propertyValue } };
         return _jsRuntime.InvokeAsync<object>("dotnetify_blazor.dispatch", _vmContextElemRef, JsonConvert.SerializeObject(data));
      }
   }
}