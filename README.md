# &nbsp;![alt tag](http://dotnetify.net/content/images/greendot.png) dotNetify-Elements

Backend-ready [dotNetify-React](http://dotnetify.net/react) components for .NET-based web applications. 

### Status
Under development...
- [x] Navigation
- [x] Form elements
- [x] Form client-side validation
- [x] Form server-side validation
- [x] Layout
- [x] Theming
- [x] Input mask
- [x] Data grid
- [ ] Modal elements
- [ ] Markdown display
- [ ] Charts

### Motivation

_The component age is here_.  Rapid development of even very complex web applications can be achieved through declarative composition of 
small, focused, and interchangeable components.  While the focus has always been with the componentization of client-side elements, 
it will be exciting to explore ways the back-end logic may be incorporated into the components.  

The dotNetify project was started with the goal of bringing simplicity to the modern web development.
This project serves as another step towards that goal, by providing a **zero-configuration** build environment,
with a set of reusable and customizable components that can be easily assembled into a professional-looking, **zero-styling** web layout and readily communicate in real-time with the back-end through dotNetify view models.

Here is a proof of concept example.  A developer minimally describes the layout of reusable components on a React page, and only assigns identifiers to components that will communicate with the back-end view model.  All data necessary for the components to render will be provided from the view models.

```jsx
export const App = props => (
  <Main>
    <Section>
      <Panel>
        <VMContext vm="MyApp">
          <TextField id="MyText" />
          <DropdownList id="MyDropdown" />
        </VMContext>
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
           .WithAttribute(this, new TextFieldAttribute { Label = "Text:", Placeholder = "Enter text" })
           .WithRequiredValidation("MyText is a required field")
           .WithServerValidation(value => Validate(value), "MyText is invalid");

       AddProperty("MyDropdown", "D3")
           .WithAttribute(this, new DropdownListAttribute
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
### Screenshot

![alt screenshot](https://dsuryd.tinytake.com/media/70df19?filename=1521437149444_18-03-2018-10-25-46.png&&type=attachment)

### How To Run This Repo

Use VSCode, open a terminal:

```
cd DevApp
npm i 
dotnet build
dotnet watch run
```
