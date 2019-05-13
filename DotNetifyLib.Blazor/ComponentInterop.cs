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

        public Task AddEventListenerAsync<TEventArg>(string eventName, ElementRef elementRef, Action<TEventArg> eventCallback)
        {
            var jsCallback = new JsCallback(arg => eventCallback?.Invoke(Callback<TEventArg>(arg)));
            return _jsRuntime.InvokeAsync<object>("dotnetify_blazor.addEventListener", eventName, elementRef, new DotNetObjectRef(jsCallback));
        }

        public Task AddEventListenerAsync<TEventArg>(string eventName, string elementSelector, Action<TEventArg> eventCallback)
        {
            var jsCallback = new JsCallback(arg => eventCallback?.Invoke(Callback<TEventArg>(arg)));
            return _jsRuntime.InvokeAsync<object>("dotnetify_blazor.addEventListener", eventName, elementSelector, new DotNetObjectRef(jsCallback));
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