## Card

The element to display other elements in a card-like container. It can include a header and a footer, either as property values, or nested along with the content and marked with HTML tags `<header>` and `<footer>`.

[inset]

```csharp
public class CardExample : BaseVM
{
   public CardExample()
   {
      AddProperty("Title", "##### Registration Card");
      AddProperty<string>("Email")
         .WithAttribute(new { Label = "Email:", Placeholder = "Enter your email address" })
         .WithPatternValidation(Pattern.Email, "Must be a valid email address.");
      AddProperty<object>("Register").WithAttribute(new ButtonAttribute { Label = "Register Today" });
   }
}
```

#### Images

An image can be added to the card by placing HTML tag `<img>` or the _Image_ element.

[inset]

```jsx
import React from 'react';
import { Card, Image, Markdown, VMContext } from 'dotnetify-elements';

const CardImageExample = _ => (
   <VMContext vm="CardImageExample">
      <Card width="360px">
         <Image id="Picture" />
         <Markdown id="Content" />
      </Card>
   </VMContext>
);
```

```csharp
public class CardImageExample : BaseVM
{
   public CardImageExample()
   {
      byte[] image = /* load the image bytes */
      AddProperty("Picture", image.ToBase64Image(Utils.Image.Jpeg));
      AddProperty("Content", "### Our Favourite Menu\r\nFish Chip Cheese - __$22__");
   }
}
```

#### Property Types

```jsx
static propTypes = {
   // Text or component for the card's header.
   header: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Text or component for the card's footer.
   footer: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Sets custom width.
   width: PropTypes.string
};
```