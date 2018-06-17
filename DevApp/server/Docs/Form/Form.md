## Form

The element to group a set of input elements and manage their validation, error handling and data submission to the back-end.  

It automatically associates _Button_ elements with _submit_ and _cancel_ attributes with the submit and cancel actions, respectively.  It also provides events for when the fields are changed, submitted, or couldn't be submitted due to validation errors. 

[inset]

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
         .WithAttribute(new TextFieldAttribute
         {
            Label = "Name:",
            Placeholder = "Enter your name (required)"
         })
         .WithRequiredValidation();

      AddProperty<string>("Email")
         .WithAttribute(new TextFieldAttribute
         { 
            Label = "Email:", 
            Placeholder = "Enter your email address" 
         })
         .WithPatternValidation(Pattern.Email, "Must be a valid email address.");

      AddProperty<FormData>("Register")
         .WithAttribute(new { Label = "Register" })
         .SubscribedBy(
            AddProperty<string>("ServerResponse"), submittedData => Save(submittedData));
   }

   private string Save(FormData data) => $"The name __'{data.Name}'__ with email '{data.Email}' was registered.";
}
```

#### Form Events

The client-side code can intercept form submission prior to it being dispatched by handling the __onSubmit__ event.  Form data is given in the argument.  The handler can cancel the server dispatch by returning false.

Another event, __onSubmitError__, occurs when validation error is received on submit. The argument contains an array of failed element Ids (_failedIds_) and an array of error messages (_messages_).  If there are nested forms, the failed elements Ids will be grouped inside an array of failed forms (_failedForms_). 

For example:

```jsx
/* Single form */
{ 
   failedIds: ["Email"], 
   messages:["Email is required"] 
}

/* Nested forms */
{ 
   failedForms: [{ formId: "Person", failedIds: ["FirstName", "LastName"] }], 
   messages: ["First Name is required", "Last Name is required"]
}
```

The __onChanged__ event occurs when the form becomes dirty.

#### Property Types

```jsx
static propTypes = {
   // Identifies a nested form. This Id will become property name in the master form data.
   id: PropTypes.string,

   // Replaces all input fields with plain text.
   plainText: PropTypes.bool,

   // Occurs when the form is submitted; emits the form data. To prevent server dispatch, return false.
   onSubmit: PropTypes.func,

   // Occurs when there's validation error on submit; emits the error.
   onSubmitError: PropTypes.func,

   // Occurs when a field is changed; emits the changed state.
   onChanged: PropTypes.func
};
```