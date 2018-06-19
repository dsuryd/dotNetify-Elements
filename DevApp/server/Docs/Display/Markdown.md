## Markdown

The element to render markdown text. It can be used with a view model, or be given the text directly.

[inset]

```csharp
public class MarkdownExample : BaseVM
{
   public MarkdownExample()
   {
         AddProperty("Content",
$@"
Markdown Text Formatting
------------------------

Markdown is a simple text format whose goal is to be very easy 
to read and write, even when not converted to HTML.

Use *stars* or _underscores_ for italics.  
**Double stars** and __double underscores__ do bold.  
***Three together*** do ___both___.

Make paragraphs by adding a blank line between chunks of text.

> This chunk of text is in a block quote.

Use dashes to make unordered lists:
- List 1
    - List 1.1
    - List 1.2
- List 2

More info at [Marked.js documentation](https://marked.js.org/#/README.md#README.md).
");
   }
}
```

#### Insets

You can render components inside the markdown text by adding <b>[</b><b>inset]</b> tags, and nest the components under the _Markdown_ element.

```jsx
const MyApp = _ => (
   <VMContext vm="InsetExample">
      <Markdown id="Content">
         <Square />
      </Markdown>
   </VMContext>
);

```
[inset]


#### Source

This element incorporates https://github.com/markedjs/marked ([license: MIT](https://github.com/markedjs/marked/blob/master/LICENSE.md))

#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string
};
```

#### Server-side Attributes

```csharp
public class Markdown
{
   public static implicit operator string(Markdown markdown) => markdown._content;

   // Returns the markdown title text.
   public string Title { get; }

   /// <summary>
   /// Constructor.
   /// </summary>
   /// <param name="embeddedResource">Embedded resource containing markdown text.</param>
   public Markdown(string embeddedResource);

   /// <summary>
   /// Returns certain section text from the markdown content.
   /// </summary>
   /// <param name="fromHeader">Section header. If null, start from the top; if empty, start right after the main title.</param>
   /// <param name="stopAtHeader">Optional section title that marks the end.</param>
   /// <returns>Markdown section.</returns>
   public string GetSection(string fromHeader, string stopAtHeader = null);
}
```