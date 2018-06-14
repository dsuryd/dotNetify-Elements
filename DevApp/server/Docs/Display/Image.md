## Image

The element to display an image.

[inset]

```csharp
public class ImageExample : BaseVM
{
   public ImageExample()
   {
      byte[] image = /* load image bytes */;
      AddProperty("Picture", $"data:image/jpeg;base64,{Convert.ToBase64String(image)}");
   }
}
```

#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string,

   // Image source.
   src: PropTypes.string
};
```