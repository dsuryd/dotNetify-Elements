using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class NotesForm : BaseVM
   {
      public ReactiveProperty<Customer> Customer { get; } = new ReactiveProperty<Customer>();

      public NotesForm()
      {
         AddProperty<string>("Notes")
            .WithAttribute(this, new TextFieldAttribute { Label = "Notes:" })
            .SubscribeTo(Customer.Select(x => x.Notes));
      }
   }
}
