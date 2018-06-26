## Alert

The element to display text or other elements in an alert box.  The text can use the github-flavored markdown syntax.

[inset]

```csharp
public class AlertExample : BaseVM
{
   public string Feedback => "### Thank you!\r\n" +
      "Your request has been received. We will review it and will be in touch shortly. " +
      "If you have any further questions you can contact us [here](email:support@bogus.io).";
}
```

#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string,

   // Danger color.
   danger: PropTypes.bool,

   // Info color.
   info: PropTypes.bool,

   // Success color.
   success: PropTypes.bool,

   // Warning color.
   warning: PropTypes.bool,

   // Occurs when the element becomes visible.
   onShow: PropTypes.func
};
```