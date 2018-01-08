# &nbsp;![alt tag](http://dotnetify.net/content/images/greendot.png) dotNetify-Elements

React components for [dotNetify](http://dotnetify.net/react). 

### Status
Starting development...

### Motivation

The component age is here.  Rapid development of even very complex web applications can be achieved through declarative composition of 
small, focused, and interchangeable components.  While the focus has always been with the componentization of client-side elements, 
it will be exciting to explore ways the back-end logic may be incorporated into the components.  

The dotNetify project was started with the goal of bringing simplicity to connecting front-end elements with the back-end models.
This project is yet another step to bring simplicity to the front-end development, by providing a zero-configuration build environment,
with a set of reusable and customizable components that can be easily assembled into a professional-looking web layout, and readily 
communicate in real-time with the back-end through dotNetify view models; all this without requiring high front-end development proficiency.

Here is an example proof of concept.  A developer minimally describes the layout of reusable components on a React page, and only assigns identifiers to components that will communicate with the back-end view model.  The styling are provided by default, resulting in a standard but professional looking web app.  All data necessary for the components to render will be provided from the view models.

```jsx
export const App = props => (
  <Main>
    <Section>
      <Panel>
        <Card>
          <CardHeader>My App</CardHeader>
          <CardBody>
            <VMContext vm="MyApp">
              <TextField id="MyText" />
              <DropdownList id="MyDropdown" />
            </VMContext>
          </CardBody>
        </Card>
      </Panel>
    </Section>
  </Main>
);
```

.NET view model:
```c#
public class MyApp : BaseVM
 {
    public MyApp()
    {
       AddProperty("MyText", "default text")
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

### How To Run This Repo

Use VSCode, open a terminal:

```
cd DevApp
npm i 
dotnet watch run
```
