## Introduction

_DotNetify-Elements_ provide the building blocks that will make your web application development a breeze.  Built on top of _dotNetify-React_, Elements are a set of customizable React components that you can readily connect to your cross-platform .NET back-end and get your data streaming in real-time with minimal effort.

_Elements_ incorporate and curate many other existing, widely-adopted open-source libraries to allow you to leverage the React community's tried-and-true favorites in your application with greater ease and speed, while forgoing the hassle of learning each of their idiosyncrasies.  Each data-driven element is designed to be plug-and-play with your C# view models through reactive programming model, and with strong support for theming and customization.

#### The Basics

Let's revisit the Hello World example (if you're not familiar with _dotNetify-React_, [read it up first!](http://dotnetify.net/react)) :

```jsx
import React from 'react';
import dotnetify from 'dotnetify';

class MyApp extends React.Component {
   constructor(props) {
      super(props);
      dotnetify.react.connect("HelloWorld", this);
      this.state = { Greetings: "" };
   }
   render() {
      return <div>{this.state.Greetings}</div>
   }
}
```
```csharp
using DotNetify;

public class HelloWorld : BaseVM
{
   public string Greetings => "Hello World!";
}
```

With _Elements_, the above React component can be succintly rewritten as a stateless functional component:
```jsx
import React from 'react';
import { VMContext, Element } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="HelloWorld">
      <div><Element id="Greetings" /></div>
   </VMContext>
);
```

The _VMContext_ component takes over the work of connecting to the back-end view model, and supplies data to the _Element_ components within its scope.  The __id__ attribute is utilized to associate the component a particular view model property for its data source. 

While the _Element_ component itself may not seem to do much, it packs some internal APIs that its sub-components can use to not only receive, but also send data back to the back-end.

#### Receiving Inputs

Here's how we use _TextField_, a sub-component of _Element_, to accept user input:

```jsx
import React from 'react';
import { VMContext, Element, TextField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="NameInput">
      <TextField  id="Name" label="Name:" placeholder="Enter your name" />
      <br/>You typed: <b><Element id="Name" /></b>
   </VMContext>
);
```
```csharp
public class NameInput : BaseVM
{
   public NameInput()
   {
      AddProperty<string>("Name");
   }
}
```
[inset]
<br/>

While you type, the _TextField_ element updates the state that's stored locally inside _VMContext_, which is also shared by the _Element_ element.  When it loses focus (or when the Enter key is pressed), the _TextField_ will dispatch the updated state to the back-end view model.

Notice that the view model uses a reactive property instead of the usual C# property.  Reactive properties are declared at runtime inside the constructor, and as you will see in later examples, they can make your logic much more expressive and fluent.

#### Attributes and Validations

What's interesting about the _Elements_ is that not only it works with property values, but that you can actually initialize their attributes from the view model.  The reactive property type provides __WithAttribute__ method to include the attributes along with the initial state:

```jsx
const MyApp = _ => (
   <VMContext vm="NameGenderInput">
      <TextField  id="Name" />
      <DropdownList id="Gender" />
   </VMContext>
);
```
```csharp
public class NameGenderInput : BaseVM
{
   public NameGenderInput()
   {
      AddProperty<string>("Name")
         .WithAttribute(this, new TextFieldAttribute { Label = "Name:", Placeholder = "Enter your name" });

      AddProperty("Gender", "")
         .WithAttribute(this, new DropdownListAttribute
         {
            Label = "Gender:",
            Options = new Dictionary<string, string>
            {
               { "", "Select your gender" },
               { "M", "Male" },
               { "F", "Female" }
            }.ToArray()
         });
   }
}
```
[inset]
<br/>
The namespace __DotNetify.Elements__ provides attribute types for many of the _Elements_.  Similarly, you can also specify validation attributes for the input Elements, i.e. required attribute, regular expression pattern, number min/max, date range, and even custom server-side validation.  The example below uses a sub-component of _TextField_, an element that only accepts whole numbers:
```jsx
const PrimeInput = _ => (
   <VMContext vm="PrimeInput">
      <NumberField id="Prime" />
   </VMContext>
);
```
```csharp
public class PrimeInput : BaseVM
{
   public PrimeInput()
   {
      AddProperty<int?>("Prime")
         .WithAttribute(this, new TextFieldAttribute
         {
            Label = "Number:",
            Placeholder = "Enter a prime number between 2 and 100"
         })
         .WithRequiredValidation(this)
         .WithMinValidation(this, 2)
         .WithMaxValidation(this, 100)
         .WithServerValidation(this, ValidatePrimeNumber, "Not a prime number");
   }

   private bool ValidatePrimeNumber(int? number)
   {
      if (number != null && number >= 2 && number <= 100)
         for (int i = 2; i < number; i++)
            if (number % i == 0) return false;
      return true;
   }
}
```
[inset]
<br/>

Placing these input elements inside a _Form_ element will give you much more features, including the ability to perform group validation and submission, dirty checking, and more.  This topic will be explored in-depth on the other section, but for now this concludes our introduction.
