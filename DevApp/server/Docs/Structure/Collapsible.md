## Collapsible

The element to display other elements in a collapsible container.

[inset]

#### Property Types

```jsx
static propTypes = {
   // Sets initial visual state to collapsed.
   collapsed: PropTypes.bool,

   // Text or component for the button's label.
   label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

   // Don't show toggle icon.
   noIcon: PropTypes.bool,

   // Occurs then visual state is toggled.
   onToggled: PropTypes.func
};
```