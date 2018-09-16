## Image

The element to display an image.  

The view model property value expects a base-64 data URI, which you can generate from the image data bytes by using the provided extension method _ToBase64Image()_.

[inset]

```csharp
public class ImageExample : BaseVM
{
   public ImageExample()
   {
      byte[] image = /* load image bytes */;
      AddProperty("Picture", image.ToBase64Image(Utils.Image.Jpeg));
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