import React from "react";
import { Markdown, withTheme } from "dotnetify-elements";
import Article from "../components/Article";

import { Alert, Checkbox, Cell, Frame, Panel, TextField } from "dotnetify-elements";

dotnetify.debug = true;

class TodoList extends React.Component {
  constructor() {
    super();
    this.vm = dotnetify.react.connect("TodoList", this);
    this.state = { Todos: [], newTodo: "", editTodoId: 0, editTodo: "" };
  }

  componentDidMount() {
    setTimeout(() => this.todoRef.focus());
  }

  componentWillUnmount() {
    this.vm.$destroy();
  }

  render() {
    const { Todos, ItemsLeft, newTodo, editTodoId, editTodo } = this.state;

    // Control the new todo and existing todo input elements.
    const typeTodo = value => this.setState({ newTodo: value });
    const typeEditTodo = value => this.setState({ editTodo: value });

    // Called when focus leaves or Enter keypress on the new todo input.
    const addTodo = (value, { changed }) => {
      if (changed) {
        this.vm.$dispatch({ Add: value });
        setTimeout(() => this.setState({ newTodo: "" }));
      }
    };

    // Called after edit's done / checkbox clicked.
    const updateTodo = todo => {
      this.vm.$dispatch({ Update: todo });
    };

    // Called when existing todo is double-clicked.
    const startEditTodo = id => {
      const todo = this.state.Todos.find(x => x.Id === id);
      this.setState({ editTodoId: id, editTodo: todo.Text });
      setTimeout(() => {
        this.editTodoRef.focus();
        this.editTodoRef.select();
      });
    };

    // Called when focus leaves or Enter keypress on the edited todo input.
    const doneEditTodo = (todo, changed) => {
      this.setState({ editTodoId: 0, editTodo: "" });
      this.todoRef.focus();
      if (changed) updateTodo(todo);
    };

    // Called when the remove icon is clicked.
    const removeTodo = id => this.vm.$dispatch({ Remove: id });

    return (
      <Frame>
        <h1>Todo List</h1>
        <TextField
          value={newTodo}
          placeholder="What do you want to do?"
          onChange={typeTodo}
          onDone={addTodo}
          onInputRef={ref => (this.todoRef = ref)}
        />
        {/* <d-text-field ref={this.todoRef} placeholder="What do you want to do?" value={newTodo} onDone={addTodo} /> */}
        <div>
          {Todos.map(todo => (
            <Cell key={todo.Id} css=".cell-body { padding: 0 }" tabIndex="0">
              {todo.Id !== editTodoId ? (
                <Panel horizontal apart middle padding=".5rem; i { cursor: pointer }">
                  <Panel onDoubleClick={_ => startEditTodo(todo.Id)}>
                    <Checkbox
                      label={todo.Text}
                      value={todo.Done}
                      onChange={val => updateTodo({ ...todo, Done: val })}
                    />
                  </Panel>
                  <i className="material-icons" onClick={_ => removeTodo(todo.Id)}>
                    cancel
                  </i>
                </Panel>
              ) : (
                <TextField
                  css="width: 100%"
                  value={editTodo}
                  onChange={typeEditTodo}
                  onDone={(value, { changed }) => doneEditTodo({ ...todo, Text: value }, changed)}
                  onInputRef={ref => (this.editTodoRef = ref)}
                />
              )}
            </Cell>
          ))}
        </div>
        <Alert success={ItemsLeft === 0} warning={ItemsLeft > 0}>
          {ItemsLeft} item{ItemsLeft > 1 && "s"} left
        </Alert>
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
