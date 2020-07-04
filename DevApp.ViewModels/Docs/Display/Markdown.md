## Markdown

The element to render markdown text. It can be used with a view model, or be given the text directly.

[inset]

<if react>

```jsx
import React from 'react';
import { Markdown, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
  <VMContext vm='MarkdownExample'>
    <Markdown id='Content' css='padding: 1rem; background: #fff' />
  </VMContext>
);
```

</if>

<if webcomponent>
```jsx
<d-vm-context vm="MarkdownExample">
   <d-markdown id="Content" css="padding: 1rem; background: #fff" />
</d-vm-context>
```
</if>

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

You can render components inside the markdown text by adding <b>[</b><b>inset]</b> tags, and nest the components under the _Markdown_ element. On render, each tag will be replaced by the nested component in the same order of appearance.

<if react>

```jsx
const MyApp = _ => (
  <VMContext vm='InsetExample'>
    <Markdown id='Content'>
      <Checkbox switch={true} value={true} label='Toggle Me'></Checkbox>
    </Markdown>
  </VMContext>
);
```

</if>

<if webcomponent>

```jsx
<d-vm-context vm='InsetExample'>
  <d-markdown id='Content'>
    <d-checkbox switch='true' value='true' label='Toggle Me'></d-checkbox>
  </d-markdown>
</d-vm-context>
```

</if>

[inset]

#### Conditional Text

If you want to control which text to display based on some conditions that you can only evaluate at runtime, enclose the text with the <b>&lt;if `token`&gt;&lt;/if&gt;</b> tags. To activate which text to show, provide the token to the **condition** argument:
<if react>

```jsx
<Markdown id='Content' condition='A' />
```

</if>

<if webcomponent>

```jsx
<d-markdown id='Content' condition='A' />
```

</if>

Tokens are not case-sensitive. Multiple
tokens can be provided by using comma as delimiter, e.g. "A,B".

#### Section Splitting

If you need to break out a big markdown file into sections that you can assign to multiple view model properties, you can use the **Markdown** object to filter the text based on the section headings.

Here's an example of how this documentation page reads a single markdown file (saved as an embedded resource) and distributes the content into several view model properties:

```csharp
public class DisplayMarkdown : BaseVM
{
   public DisplayMarkdown()
   {
      var markdown = new Markdown("dotNetify_Elements.Docs.Display.Markdown.md");

      AddProperty("Title", markdown.Title);
      AddProperty("Overview", markdown.GetSection("", "Property Type"));
      AddProperty("API", markdown.GetSection("Property Type"));
   }
}
```

#### Source

https://github.com/markedjs/marked ([license: MIT](https://github.com/markedjs/marked/blob/master/LICENSE.md))

#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string,

   // Markdown text.
   text: PropTypes.String,

   // Comma-delimited condition constants.
   condition: PropTypes.String
};
```

#### Server-side Object

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
