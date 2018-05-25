using DotNetify;
using DotNetify.Elements;
using System;

namespace dotNetify_Elements
{
   public class FormButton : BaseVM
   {
      public FormButton()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.Form.Button.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class ButtonExample : BaseVM
   {
      private int _addCounter;

      public ButtonExample()
      {
         AddProperty<object>("Add")
            .WithAttribute(this, new ButtonAttribute { Label = "Add" })
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