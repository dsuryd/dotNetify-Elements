import React from 'react';
import { Markdown, withTheme } from 'dotnetify-elements';
import Article from '../components/Article';

import { Frame, Button, Checkbox, Cell, Panel, TextField } from 'dotnetify-elements';

dotnetify.debug = true;

const cellCss = `
  .cell-body { padding: 0 }
  .item { width: 100%; padding: .5rem }
`;

class TodoList extends React.Component {
   constructor() {
      super();
      this.vm = dotnetify.react.connect('TodoList', this);
      this.state = { Todos: [], newTodo: '', editTodoId: 0, editTodo: '' };
   }

   componentDidMount() {
      setTimeout(() => this.todoRef.current.focus());
   }

   componentWillUnmount() {
      this.vm.$destroy();
   }

   render() {
      const { Todos, newTodo, editTodoId, editTodo } = this.state;

      // Control the new todo and existing todo input elements.
      const typeTodo = value => this.setState({ newTodo: value });
      const typeEditTodo = value => this.setState({ editTodo: value });

      // Called when focus leaves or Enter keypress on the new todo input.
      const addTodo = (value, { changed }) => {
         if (changed) {
            this.vm.$dispatch({ Add: value });
            setTimeout(() => this.setState({ newTodo: '' }));
         }
      };

      // Called when existing todo is double-clicked.
      const startEditTodo = id => {
         const todo = this.state.Todos.find(x => x.Id === id);
         this.setState({ editTodoId: id, editTodo: todo.Text });
         setTimeout(() => {
            this.editTodoRef.current.focus();
            this.editTodoRef.current.select();
         });
      };

      // Called when focus leaves or Enter keypress on the edited todo input.
      const doneEditTodo = (id, value, changed) => {
         this.setState({ editTodoId: 0, editTodo: '' });
         this.todoRef.current.focus();
         if (changed) this.vm.$dispatch({ Update: { Id: id, Text: value } });
      };

      return (
         <Frame>
            <h1>Todo List</h1>
            <TextField
               inputRef={ref => (this.todoRef = ref)}
               value={newTodo}
               placeholder="What do you want to do?"
               onChange={typeTodo}
               onDone={addTodo}
            />
            <div>
               {Todos.map(todo => (
                  <Cell key={todo.Id} css={cellCss} tabIndex="0">
                     {todo.Id !== editTodoId ? (
                        <div className="item" onDoubleClick={_ => startEditTodo(todo.Id)}>
                           <Checkbox label={todo.Text} />
                        </div>
                     ) : (
                        <TextField
                           inputRef={ref => (this.editTodoRef = ref)}
                           value={editTodo}
                           onChange={typeEditTodo}
                           onDone={(value, { changed }) => doneEditTodo(todo.Id, value, changed)}
                           css="width: 100%"
                        />
                     )}
                  </Cell>
               ))}
            </div>
         </Frame>
      );
   }
}

const Sandbox = _ => (
   <Article vm="Sandbox" id="Content">
      <Markdown id="Content">
         <TodoList />
      </Markdown>
   </Article>
);

const BasicDemo = () => (
   <d-main>
      <d-header>
         <div>Header</div>
      </d-header>
      <d-nav width="10px">
         <div>Nav</div>
      </d-nav>
      <d-section>
         <d-vm-context vm="HelloWorld">
            <d-element id="Greetings">
               <d-card test="test">
                  <h1 slot="value" />
               </d-card>
            </d-element>
         </d-vm-context>
      </d-section>
      <d-footer>
         <div>Footer</div>
      </d-footer>
   </d-main>
);

export default withTheme(TodoList);
