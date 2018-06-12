## Modal

The element to display other elements in a modal container.  It can include a header and a footer, either as property values, or nested along with the content and marked with HTML tags `<header>` and `<footer>`.  

Turn it into a modal form by adding _onSubmit_ or _onSubmitError_ event handler.

[inset]

```csharp
public class ModalExample : BaseVM
{
   public ModalExample()
   {
      AddProperty<string>("Email")
         .WithAttribute(new { Label = "Email:", Placeholder = "Enter your email address" })
         .WithPatternValidation(Pattern.Email, "Must be a valid email address.");

      AddProperty<object>("Register").WithAttribute(new ButtonAttribute { Label = "Register" });
   }
}
```

#### Source

This element incorporates https://github.com/reactstrap/reactstrap ([license: MIT](https://github.com/reactstrap/reactstrap/blob/master/LICENSE))

#### Property Types

```jsx
static propTypes = {
   // Text or component for the card's header.
   header: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Text or component for the card's footer.
   footer: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Opens the modal.
   open: PropTypes.bool,

   // Sets dimension to small.
   small: PropTypes.bool,

   // Sets dimension to large.
   large: PropTypes.bool,

   // Sets custom width.
   width: PropTypes.number,

   // Occurs when the form inside the modal is submitted; emits the form data.
   onSubmit: PropTypes.func,

   // Occurs when there's validation error on submit; emits the error.
   onSubmitError: PropTypes.func
};
```