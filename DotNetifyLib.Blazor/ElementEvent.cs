using Microsoft.AspNetCore.Components;

namespace DotNetify.Blazor
{
    public class ElementEvent
    {
        public string TargetId { get; set; }
        public string EventName { get; set; }
        public object EventArgs { get; set; }
    }
}
