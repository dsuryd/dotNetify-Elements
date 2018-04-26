## Overview

DotNetify-Elements provide the building blocks that will make your web application development a breeze.  Built on top of dotNetify-React, Elements are a set of React components that you can readily connect to your cross-platform .NET back-end and get your data streaming without much effort at all!

##### The Basics

Let's revisit the Hello World example:

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
```cs
using DotNetify;

public class HelloWorld : BaseVM
{
   public string Greetings => "Hello World!";
}
```

With Elements, the above React component can be succintly rewritten as a stateless component:
```jsx
import React from 'react';
import { VMContext, Element } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="HelloWorld">
      <div><Element id="Greetings" /></div>
   </VMContext>
);
```

The _VMContext_ component takes over the work of connecting to the back-end view model, and supplies data to the Element components within its scope.  

The _Element_ component itself may not seem to do much, but it packs some internal APIs that any inherited component can use to not only receive data, but also dispatch data back to the back-end.

##### Receiving Inputs

Here's how we use the inherited component _TextField_ to accept input:

```jsx
import React from 'react';
import { VMContext, Element, TextField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="UserInput">
      <TextField  id="Name" label="Name:" placeholder="Enter your name" />
      <br />You have typed: <b><Element id="Name" /></b>
   </VMContext>
);
```
```cs
public class UserInput : BaseVM
{
   public UserInput()
   {
      AddProperty<string>("Name");
   }
}
```
[inset]
<br/>

The _TextField_ element dispatches the input text to the back-end on losing focus, but since _VMContext_ stores the state, it allows the _Element_ element to update its value as you type.  

Notice that the view model uses a reactive property instead of the usual C# property.  Reactive programming allows you to write clear and concise code, which shall be demonstrated in later examples.

##### Attributes and Validations

