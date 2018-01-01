# &nbsp;![alt tag](http://dotnetify.net/content/images/greendot.png) dotNetify-Elements

React components for [dotNetify](http://dotnetify.net/react). 

### Status
Starting development...

### Motivation

The component age is here.  Rapid development of even very complex web applications can be achieved through declarative composition of 
small, focused, and interchangeable components.  While the focus has always been with the componentization of client-side elements, 
largely unexplored is the techniques to incorporate back-end logic into the components.  

The dotNetify project was started with the goal of bringing simplicity in connecting front-end elements with the .NET back-end objects.
This project is yet another step to bring simplicity to the front-end development, by creating a set of reusable components that can be
used to both build a professional-looking web layout and readily communicate with the server through dotNetify view models,
and without requiring high proficiency in front-end development techniques and tools.

Here is an example proof of concept:

React page:
```jsx
const App = props => (
  <Main>
    <Section>
      <Panel>
        <VMContext vm="App">
          <TextField id="MyText" />
          <DropdownList id="MyDropdown" />
        </VMContext>
      </Panel>
    </Section>
  </Main>
);

export default App;
```

.NET view model:
```c#
public class App : BaseVM
 {
    public App()
    {
       AddProperty("MyText", "")
           .SetAttribute(this, new TextField { Label = "Text:", Placeholder = "Enter text" });

       AddProperty("MyDropdown", "D3")
           .SetAttribute(this, new DropdownList
           {
              Label = "Dropdown list:",
              Options = new Dictionary<string, string>
               {
                  { "D1", "Dropdown 1" },
                  { "D2", "Dropdown 2" },
                  { "D3", "Dropdown 3" },
                  { "D4", "Dropdown 4" },
                  { "D5", "Dropdown 5" }
               }.ToArray()
           });
    }
 }
```


