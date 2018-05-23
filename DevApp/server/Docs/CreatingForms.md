## Creating Forms

Creating forms from scratch with React can be quite a chore. If you are a line-of-business application developer, you know that there are plenty of aspects that you need to get right, from providing different types of inputs with the right layout, doing different kinds of validations (some asynchronously) and having their error messages shown, to tracking dirty state to get the submit button enabled, and making sure all the required inputs are filled before user can submit. 

_Form Elements_ can help you avoid repetition and getting all of these done quickly. And with reactive programming paradigm at our disposal, even handling nested forms can be reduced to just a small amount of code.

#### Form Submission

Individual input elements will immediately dispatch the changed value to the back-end when the focus leaves the field.  To group them together and dispatch the values on activating the submit button, enclose the elements inside a _Form_ element along with a _Button_ element with the _submit_ attribute:

```jsx
import React from 'react';
import { Alert, Button, DropdownList, Form, Panel, TextField, VMContext } from 'elements';

const BasicForm = _ => (
   <VMContext vm="BasicForm">
      <Form>
         <Alert id="SubmitFeedback" />
         <Panel>
            <TextField id="Name" />
            <DropdownList id="Gender" />
            <Button id="Submit" submit />
         </Panel>
      </Form>
   </VMContext>
);
```

[inset]
<br/>

There are several things that happen when you use the _Form_ element:
- It tracks the dirty state of the input fields, and use the information to control the enable state of the Submit button.
- It makes sure the fields are all validated on submit, and won't let it continue when there's error.
- It submits the values together as a single form data object.

Take a look at how the back-end code receives and processes the form data:

```csharp
public class BasicForm : BaseVM
{
   public enum Gender { NotSpecified, Male, Female }

   private class FormData
   {
      public string Name { get; set; }
      public Gender Gender { get; set; }
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

      AddProperty<Gender>("Gender")
         .WithAttribute(this, new DropdownListAttribute
         {
            Label = "Gender:",
            Placeholder = "Select your gender...",
            Options = new Dictionary<Gender, string>
            {
               { Gender.NotSpecified, "" },
               { Gender.Male, "Male" },
               { Gender.Female, "Female" }
            }
            .Select(kvp => KeyValuePair.Create($"{(int)kvp.Key}", kvp.Value))
            .ToArray()
         });

      AddProperty<FormData>("Submit")
         .WithAttribute(this, new { Label = "Submit" })
         .SubscribedBy(
            AddProperty<string>("SubmitFeedback"), submittedData => Save(submittedData));
   }

   private string Save(FormData data) 
   {
      // ... save the form data here ... 
      // ... and then return some feedback to the user.
      return $"The name __'{data.Name}'__ of gender __'{data.Gender}'__ was received.";
   } 
}
```

The _Submit_ property is associated with the Submit button, and will receive the form data when the button is activated. It is chained to the _SubmitFeedback_ property with the __SubscribedBy__ reactive API, which will use the given lambda function (which calls the _Save_ method) to transform incoming form data into a feedback message.  

### Asynchronous Validation

In some cases, we want certain input to be validated on the server while the form is still being filled.  This can be done simply by adding __WithServerValidation__ to the desired property:

 



