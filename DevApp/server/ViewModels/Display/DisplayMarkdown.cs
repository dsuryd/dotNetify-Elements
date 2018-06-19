using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class DisplayMarkdown : BaseVM
   {
      public DisplayMarkdown()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Display.Markdown.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class MarkdownExample : BaseVM
   {
      public MarkdownExample()
      {
         AddProperty("Content",
$@"
Markdown Text Formatting
------------------------

Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.

Use *stars* or _underscores_ for italics.  **Double stars** and __double underscores__ do bold.  ***Three together*** do ___both___.

Make paragraphs by adding a blank line between chunks of text.

> This chunk of text is in a block quote.

Use dashes to make unordered lists:
- List 1
    - List 1.1
    - List 1.2
- List 2

Check out [Marked.js documentation](https://marked.js.org/#/README.md#README.md) for more.
");
      }
   }

   public class InsetExample : BaseVM
   {
      public InsetExample()
      {
         AddProperty("Content",
$@"
Text before the square.
[inset]
Text after the square.
");
      }
   }
}