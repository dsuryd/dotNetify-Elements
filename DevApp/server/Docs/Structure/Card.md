## Card

The element to display other elements in a card-like container. It can include header and footer, either as components passed as properties, or nested along with the content and marked with HTML `<header>` and `<footer>` elements.

[inset]

```csharp
public class CardExample : BaseVM
{
   public CardExample()
   {
      AddProperty("Title", "Registration is open");
      AddProperty("Content", "Join us for July 4 celebration at Downtown.  See registration page for details.");
      AddProperty<object>("Register").WithAttribute(new ButtonAttribute { Label = "Register Today" });

      AddProperty("SpecialsTitle", "Lunch Specials");
      AddProperty("Specials", "Supreme Pizza + Large Drink - $8.99");
   }
}
```

#### Property Types

```jsx
static propTypes = {
   // Text or component for the card's header.
   header: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Text or component for the card's footer.
   footer: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])
};
```