using System;
using System.Collections.Generic;
using System.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class Sandbox : BaseVM
   {
      public string Content => "";
   }

   public class TodoList : MulticastVM
    {
      private readonly List<Todo> _todos = new List<Todo>();

      public class Todo
      {
          public int Id { get; set; }
          public string Text { get; set;}
          public bool Done { get; set; }
      }

      public List<Todo> Todos => _todos;

      public string Todos_itemKey => nameof(Todo.Id);

      public int ItemsLeft => _todos.Count(x => !x.Done);

      public Action<string> Add => text =>
      {
        var todo = new Todo { Id = text.GetHashCode(), Text = text };
        if (!_todos.Any(x => x.Id == todo.Id))
        {
          _todos.Add(todo);
          this.AddList(nameof(Todos), todo);
          Changed(nameof(ItemsLeft));
        }
      };

      public Action<Todo> Update => update =>
      {
          var todo = _todos.Find(x => x.Id == update.Id);
          if (todo != null)
          {
             if (string.IsNullOrWhiteSpace(update.Text))
               Remove(update.Id);
             else {
               todo.Text = update.Text;
               todo.Done = update.Done;
               this.UpdateList(nameof(Todos), todo);    
               Changed(nameof(ItemsLeft));        
             }
          }
      };

      public Action<int> Remove => id =>
      {
          var todo = _todos.Find(x => x.Id == id);
          if (todo != null)
          {
            _todos.Remove(todo);
            this.RemoveList(nameof(Todos), id);
            Changed(nameof(ItemsLeft));
          }
      };
      
    }
}