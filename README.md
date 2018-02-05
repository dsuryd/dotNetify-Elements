# &nbsp;![alt tag](http://dotnetify.net/content/images/greendot.png) dotNetify-Elements

React components for [dotNetify](http://dotnetify.net/react). 

### Status
Still under development...but a lot already got done; see screenshot below! 

### Motivation

_The component age is here_.  Rapid development of even very complex web applications can be achieved through declarative composition of 
small, focused, and interchangeable components.  While the focus has always been with the componentization of client-side elements, 
it will be exciting to explore ways the back-end logic may be incorporated into the components.  

The dotNetify project was started with the goal of bringing simplicity to the front-end development for .NET back-end developers.
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
           .WithAttribute(this, new TextField { Label = "Text:", Placeholder = "Enter text" })
           .WithRequiredValidation("MyText is a required field");

       AddProperty("MyDropdown", "D3")
           .WithAttribute(this, new DropdownList
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
### Current Progress

![alt screenshot](https://dsuryd.tinytake.com/media/6caa11?filename=1517803251416_04-02-2018-08-00-51.png&sub_type=thumbnail_preview&type=attachment)

### How To Run This Repo

Use VSCode, open a terminal:

```
cd DevApp
npm i 
dotnet build
dotnet watch run
```
