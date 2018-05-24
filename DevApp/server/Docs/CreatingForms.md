## Working with Forms

Creating forms from scratch with React can be quite a chore. If you are a line-of-business application developer, you know that there are plenty of aspects that you need to get right, from providing different types of inputs with the right layout, doing different kinds of validations (some asynchronously) and having their error messages shown, to tracking dirty state to get the submit button enabled, and making sure all the required inputs are filled before user can submit. 

_Form Elements_ can help you avoid repetition and getting all of these done quickly. And with reactive programming paradigm at our disposal, even handling nested forms can be reduced to only a small amount of code.

#### Form Submission

Individual input elements will immediately dispatch the changed value to the back-end when the focus leaves the field.  To group them together and dispatch the values on activating the submit button, enclose the elements inside a _Form_ element.

The _Form_ element will associate the _Button_ elements with _submit_ and _cancel_ attributes with submit and cancel actions, respectively.  Submit button must be associated with a view model property that will accept the submitted form data, while cancel button can be purely client-side.  

```jsx
import React from 'react';
import { VMContext, Form, Alert, Panel, TextField, Button } from 'dotnetify-elements';

const BasicForm = _ => (
   <VMContext vm="BasicForm">
      <Form>
         <Alert id="ServerResponse" />
         <Panel>
            <TextField id="Name" />
            <TextField id="Email" />
            <Panel horizontal right>
               <Button label="Cancel" cancel secondary />
               <Button id="Register" submit />
            </Panel>
         </Panel>
      </Form>
   </VMContext>
);
```

[inset]
<br/>

There are several things that happen when you use the _Form_ element:
- It tracks the dirty state of the input fields, and use the information to control the enable state of the Submit button.
- It makes sure the fields are all validated upon submit.
- It won't let you submit if there's error, and will set the focus back to the invalid field.
- It submits all the validated field values as a single form data object.
- On cancel, it restores all the fields to their original values.

Take a look at how the back-end code receives and processes the form data:

```csharp
public class BasicForm : BaseVM
{
   private class FormData
   {
      public string Name { get; set; }
      public string Email { get; set; }
   }

   public BasicForm()
   {
      AddProperty<string>("Name")
         .WithAttribute(this, new TextFieldAttribute
         {
            Label = "Name:", 
            Placeholder = "Enter your name (required)"
         })
         .WithRequiredValidation(this);

      AddProperty<string>("Email")
         .WithAttribute(this, new TextFieldAttribute
         { 
            Label = "Email:", 
            Placeholder = "Enter your email address" 
         })
         .WithPatternValidation(this, Pattern.Email, "Must be a valid email address.");

      AddProperty<FormData>("Register")
         .WithAttribute(this, new { Label = "Register" })
         .SubscribedBy(
            AddProperty<string>("ServerResponse"), submittedData => Save(submittedData));
   }

   private string Save(FormData data) 
   {
      // ... save the form data here ... 
      // ... and then return some feedback to the user.
      return $"The name __'{data.Name}'__ with email '{data.Email}' was registered.";
   } 
}
```

The _Register_ property is associated with the Submit button, and will receive the form data when the button is activated. The property is reactively chained to the _ServerResponse_ property, which uses the specified mapper function (calling the _Save_ method) to transform incoming form data into server response message.  

> If you aren't yet familiar with reactive programming, the concept is akin to setting up explicit data pipelines between two properties, where one property being the publisher of data, and the other its subscriber.  The subscriber in turn can also become a publisher to another property, and so on. 
>
> The _System.Reactive_ library helps us by providing a set of APIs that allow us to express the concept as  to make the code expressive, declarative and asynchronous.  DotNetify extends it further with the __SubscribeTo__ and __SubscribedBy__ APIs to support simpler chaining syntax.

#### Asynchronous Validation

In some cases, we want certain input to be validated on the server while the form is still being filled.  This can be done simply by adding __WithServerValidation__ to the desired property.  Let's modify the above example by adding back-end logic that saves submitted form data to a list, clears the fields after every submit, and checks new email field input against the list:

 ```csharp
public class AsyncValidation : BaseVM
{
   private class FormData
   {
      public string Name { get; set; }
      public string Email { get; set; }
   }

   private List<FormData> _registeredList = new List<FormData>();

   public AsyncValidation()
   {
      var clearForm = AddInternalProperty<bool>("ClearForm");

      AddProperty<string>("Name")
         .WithAttribute(this, new TextFieldAttribute
         {
            Label = "Name:",
            Placeholder = "Enter your name (required)"
         })
         .WithRequiredValidation(this)
         .SubscribeTo(clearForm.Select(_ => ""));

      AddProperty<string>("Email")
         .WithAttribute(this, new TextFieldAttribute
         { 
            Label = "Email:", 
            Placeholder = "Enter your email address" 
         })
         .WithPatternValidation(this, Pattern.Email, "Must be a valid email address.")
         .WithServerValidation(this, ValidateEmailNotRegistered, "Email already registered")
         .SubscribeTo(clearForm.Select(_ => ""));

      AddProperty<FormData>("Register")
         .WithAttribute(this, new { Label = "Register" })
         .SubscribedBy(
            AddProperty<string>("ServerResponse"), submittedData => Save(submittedData))
               .SubscribedBy(clearForm, _ => true);        
   }

   private string Save(FormData data) 
   {
      _registeredList.Add(data);
      return $"The name __'{data.Name}'__ with email '{data.Email}' was registered.";
   } 

   private bool ValidateEmailNotRegistered(string email) => !_registeredList.Any(x => x.Email == email);
}
 ```

[inset]
<br/>

Adding __WithServerValidation__ allows the field to dispatch its value to be validated on the back-end without having the form submitted first. 

#### Client-Side Validation and Event Handling





