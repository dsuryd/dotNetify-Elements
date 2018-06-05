## Card

The element to display other elements in a card-like container. It can include header and footer, either as components passed as properties, or nested along with the content and marked with HTML `<header>` and `<footer>` elements.

[inset]

#### Property Types

```jsx
static propTypes = {
   // Text or component for the card's header.
   header: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Text or component for the card's footer.
   footer: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])
};
```