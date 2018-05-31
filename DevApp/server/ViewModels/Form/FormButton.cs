using DotNetify;
using DotNetify.Elements;
using System;

namespace dotNetify_Elements
{
   public class FormButton : BaseVM
   {
      public FormButton()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Form.Button.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class ButtonExample : BaseVM
   {
      private int _addCounter;

      public ButtonExample()
      {
         AddProperty<object>("Add")
            .WithAttribute(new ButtonAttribute { Label = "Add" })
            .SubscribedBy(AddProperty<string>("AddCounter"), _ => $"Added: {++_addCounter}");

         AddProperty<DateTimeOffset>("Remove")
            .SubscribedBy(AddProperty<string>("RemoveTimeStamp"), date => $"Removed: {date.ToString("T")}");
      }
   }

   public class ButtonCustomize : BaseVM
   {
      public ButtonCustomize()
      {
         AddProperty<string>("MyButton");
      }
   }
}