## Field

The element to provide a container for input fields.  Normally you wouldn't use this directly, only when you need to create custom fields with similar layout and configuration capabilities to the Form elements.

#### Property Types

```jsx
static propTypes = {
   // Id to associate the label with the input element.
   id: PropTypes.string,

   // Style in css format.
   css: PropTypes.string,

   // Displays the label text horizontally to the left of the input.
   horizontal: PropTypes.bool,

   // Text or component for the field's label.
   label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Use plain text container.
   plainText: PropTypes.bool,

   // Right-align the input element.
   right: PropTypes.bool,

   // Sets custom width.
   width: PropTypes.string
};
```