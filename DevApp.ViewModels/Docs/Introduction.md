## Introduction

<p style="font-size: 1.25rem">
<i>DotNetify-Elements</i> is a set of <if react>React components</if><if webcomponent>HTML native web component wrapper of React components</if>  that you can readily connect to your cross-platform .NET back-end in an MVVM fashion and get them communicating in real-time through WebSocket with SignalR.
</p>

_Elements_ incorporates and curates many other existing, widely-adopted open-source libraries to allow you to leverage the React community's tried-and-true favorites in your application with greater ease and speed. The components are designed to plug-and-play with your C# view models, and use reactive programming paradigm to produce simple and maintainable code.

<if react>
If you're not using React, you can still use _Elements_ through HTML custom elements of the Web Component standard, which allow them be embedded on your page just like regular HTML tags.  
</if>

#### The Basics

Use _Elements_ to fetch the initial state for your component from a back-end C# view model by enclosing your code with a `VMContext` component (or `d-vm-context` for web component), and setting its <if react>_VM_</if><if webcomponent>_vm_</if> attribute to the name of the view model that will provide the state:

<if react>

```jsx
import React from 'react';
import { VMContext, Element } from 'dotnetify-elements';

const MyApp = _ => (
  <VMContext vm='HelloWorld'>
    <div>
      <Element id='Greetings' />
    </div>
  </VMContext>
);
```

</if>
<if webcomponent>
```jsx
<d-vm-context vm='HelloWorld'>
  <div>
    <d-element id='Greetings' />
  </div>
</d-vm-context>
```
</if>

```csharp
using DotNetify;

public class HelloWorld : BaseVM
{
   public string Greetings => "Hello World!";
}
```

The `VMContext` component takes over the work of connecting to the back-end view model, and supplies data to the `Element` components within its scope. The **id** attribute is utilized to associate the component a particular view model property for its data source.

While the `Element` component itself may not seem to do much, it packs some internal APIs that its sub-components can use to not only receive, but also send data back to the back-end.

#### Receiving Inputs

Here's how we use `TextField`, a sub-component of `Element`, to accept user input:

<if react>

```jsx
import React from 'react';
import { VMContext, Element, TextField } from 'dotnetify-elements';

const MyApp = _ => (
  <VMContext vm='NameInput'>
    <TextField id='Name' label='Name:' placeholder='Enter your name' />
    <br />
    You typed:&nbsp;
    <b>
      <Element id='Name' />
    </b>
  </VMContext>
);
```

</if>
<if webcomponent>
```jsx
<d-vm-context vm='NameInput'>
  <d-text-field id='Name' label='Name:' placeholder='Enter your name' />
  <br />
  You typed:&nbsp;
  <b>
    <d-element id='Name' />
  </b>
</d-vm-context>
```
</if>

[inset]

```csharp
public class NameInput : BaseVM
{
   public NameInput()
   {
      AddProperty<string>("Name");
   }
}
```

While you type, the `TextField` element updates the state that's stored locally inside `VMContext`, which is also shared by the `Element` element. When it loses focus (or when the Enter key is pressed), the `TextField` will dispatch the updated state to the back-end view model.

Notice that the view model uses a reactive property instead of the usual C# property. Reactive properties are declared at runtime inside the constructor, and as you will see in later examples, they can make your logic much more expressive and fluent.

#### Attributes and Validations

What's interesting about the `Element` is that not only it works with property values, but that you can actually initialize their attributes from the view model. The reactive property type provides **WithAttribute** method to include the attributes along with the initial state:

<if react>

```jsx
const MyApp = _ => (
  <VMContext vm='NameGenderInput'>
    <TextField id='Name' />
    <DropdownList id='Gender' />
  </VMContext>
);
```

</if>
<if webcomponent>
```jsx
<d-vm-context vm='NameGenderInput'>
  <d-text-field id='Name' />
  <d-dropdown-list id='Gender' />
</d-vmcontext>
```
</if>

[inset]

```csharp
public class NameGenderInput : BaseVM
{
   public NameGenderInput()
   {
      AddProperty<string>("Name")
         .WithAttribute(new TextFieldAttribute { Label = "Name:", Placeholder = "Enter your name" });

      AddProperty("Gender", "")
         .WithAttribute(new DropdownListAttribute
         {
            Label = "Gender:",
            Placeholder = "Select your gender...",
            Options = new Dictionary<string, string>
            {
               { "", "" },
               { "M", "Male" },
               { "F", "Female" }
            }.ToArray()
         });
   }
}
```

The namespace **DotNetify.Elements** provides attribute types for various _Elements_. Similarly, you can also specify validation attributes for the input _Elements_, i.e. required attribute, regular expression pattern, number min/max, date range, and even custom server-side validation. The example below uses `NumberField`, a sub-component of `TextField`, an element that only accepts whole numbers:

<if react>

```jsx
const PrimeInput = _ => (
  <VMContext vm='PrimeInput'>
    <NumberField id='Prime' />
  </VMContext>
);
```

</if>
<if webcomponent>
```jsx
<d-vm-context vm='PrimeInput'>
  <d-number-field id='Prime' />
</d-vm-context>
```
</if>

[inset]

```csharp
public class PrimeInput : BaseVM
{
   public PrimeInput()
   {
      AddProperty<int?>("Prime")
         .WithAttribute(new TextFieldAttribute
         {
            Label = "Number:",
            Placeholder = "Enter a prime number between 2 and 100"
         })
         .WithRequiredValidation()
         .WithMinValidation(2)
         .WithMaxValidation(100)
         .WithServerValidation(ValidatePrimeNumber, "Not a prime number");
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

Placing these input elements inside a `Form` element will give you much more features, including the ability to perform form-level validation, submission and error handling, dirty checking, and more. We will cover this topic more in the other section.

Note that the attribute types are just there to help you to figure out things that can be configured, but the usage is completely optional. They can be substituted with anonymous object:

```csharp
AddProperty<string>("Name")
   .WithAttribute(new { Label = "Name:", Placeholder = "Enter your name" })
```

#### Real-Time Streaming

_DotNetify-Elements_ gives you real-time data streaming capability _by default_. Every view model is capable of pushing data to the client in real-time. Combine this MVVM paradigm with reactive programming on both the front- and back-end, and you get a powerful framework for tackling the complexity of real-time programming.

The following example again uses the simple _Element_, but this time we program the back-end view model to keep pushing an updated time value every second.<if react>The element is enclosed in a component made with [styled-components](https://www.styled-components.com/), a popular React library that _Elements_ also uses extensively.</if>

<if react>

```jsx
import React from 'react';
import styled from 'styled-components';
import { Element, VMContext } from 'dotnetify-elements';

const DigitalStyle = styled.div`
  font-family: 'Orbitron';
  font-size: 4rem;
  display: flex;
  justify-content: center;
`;

const RealtimeClock = _ => (
  <VMContext vm='RealtimeClock'>
    <DigitalStyle>
      <Element id='Clock' />
    </DigitalStyle>
  </VMContext>
);
```

</if>
<if webcomponent>
```jsx
<d-vm-context vm='RealtimeClock'>
  <div class="digital-style">
    <d-element id='Clock' />
  </div>
</d-vm-context>
```
</if>

[inset]

```csharp
using DotNetify;
using System;
using System.Reactive.Linq;

public class RealtimeClock : BaseVM
{
   public RealtimeClock()
   {
      // Use System.Reactive.Linq to create a reactive object that emits a value every second.
      var rxTimer = Observable.Interval(TimeSpan.FromSeconds(1)).StartWith(0);

      AddProperty<string>("Clock")
         .SubscribeTo(rxTimer.Select(_ => DateTime.Now.ToString("hh:mm:ss tt")))
         .SubscribedBy(AddInternalProperty<bool>("Update"), _ => { PushUpdates(); return true; });
   }
}
```

<if react>
#### Events

The _VMContext_ element provides the following events:

- **onConnected**: occurs when the initial connection is established with the back-end view model. The arguments passed are the dotNetify `vm` object, and the initial state.
- **onStateChange**: occurs whenever there's incoming state change from the server.

```jsx
<VMContext
  onConnected={(vm, initialState) => {
    this.vm = vm;
    console.log(initialState);
  }}
  onStateChange={state => console.log(state)}
/>
```

</if>
