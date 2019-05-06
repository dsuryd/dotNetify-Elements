using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetify.Blazor
{
   public interface IVMProxy : IDisposable
   {
      /// <summary>
      /// Reference to the associated 'd-vm-context' HTML markup.
      /// </summary>
      ElementRef ElementRef { get; set; }

      /// <summary>
      /// Listens to the state changed event from the server-side view model.
      /// </summary>
      /// <param name="stateChangedEventHandler">Gets called when the client receives state change from the server-side view model.</param>
      Task HandleStateChangedAsync<TState>(EventHandler<TState> stateChangedEventHandler);

      /// <summary>
      /// Listens to an event from a DOM element.
      /// </summary>
      /// <typeparam name="TEventArg">Event argument type.</typeparam>
      /// <param name="domSelector">Document element selector.</param>
      /// <param name="eventName">Event name.</param>
      /// <param name="eventHandler">Event handler.</param>
      Task HandleDomEventAsync<TEventArg>(string eventName, string domSelector, EventHandler<TEventArg> eventHandler);

      /// <summary>
      /// Dispatches property value to server-side view model.
      /// </summary>
      /// <param name="propertyName">Name that matches a server-side view model property.</param>
      /// <param name="propertyValue">Value to be dispatched.</param>
      Task DispatchAsync(string propertyName, object propertyValue = null);

      /// <summary>
      /// Disposes the context element.
      /// </summary>
      /// <returns></returns>
      Task DisposeAsync();
   }

   public class VMProxy : ComponentInterop, IVMProxy
   {
      private ElementRef _vmContextElemRef;
      private bool _hasElementRef;
      private bool _init;

      public ElementRef ElementRef
      {
         get => _vmContextElemRef;
         set
         {
            _vmContextElemRef = value;
            _hasElementRef = true;
         }
      }

      public VMProxy(IJSRuntime jsRuntime) : base(jsRuntime)
      {
      }

      public void Dispose()
      {
         DisposeAsync();
      }

      public Task DisposeAsync()
      {
         return _jsRuntime.InvokeAsync<object>("dotnetify_blazor.destroy", _vmContextElemRef);
      }

      public Task HandleStateChangedAsync<TState>(EventHandler<TState> stateChanged)
      {
         if (_init)
            return Task.CompletedTask;
         else if (!_hasElementRef)
            throw new ArgumentNullException("ElementRef was not set. Make sure you assign it to the \"ref\" attribute of the \"d-vm-context\" tag.");

         _init = true;

         return AddEventListenerAsync<TState>("onStateChange", ElementRef, state => stateChanged?.Invoke(this, state));
      }

      public Task HandleDomEventAsync<TEventArg>(string eventName, string domSelector, EventHandler<TEventArg> eventHandler)
      {
         return AddEventListenerAsync<TEventArg>(eventName, domSelector, arg =>
         {
            System.Console.WriteLine("TEST");
            eventHandler?.Invoke(this, arg);
         });
      }

      public Task DispatchAsync(string propertyName, object propertyValue = null)
      {
         var data = new Dictionary<string, object>() { { propertyName, propertyValue } };
         return _jsRuntime.InvokeAsync<object>("dotnetify_blazor.dispatch", _vmContextElemRef, JsonConvert.SerializeObject(data));
      }
   }
}