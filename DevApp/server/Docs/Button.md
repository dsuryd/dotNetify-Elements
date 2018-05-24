The element to accept action input. 

[inset]

```csharp
```

#### Property Types

```jsx
static propTypes = {
   // Associates the button with form cancel action.
   cancel: PropTypes.bool,

   // Disables the button.
   disable: PropTypes.bool,
   
   // Controls the button's visibility.
   if: PropTypes.bool,

   // Text or component for the button's label.
   label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Associates the button with form submit action.
   submit: PropTypes.bool
};
```