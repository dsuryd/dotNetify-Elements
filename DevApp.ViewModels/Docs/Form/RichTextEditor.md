## RichTextEditor

The element to accept rich text input; based on [Quill](https://quilljs.com). 

[inset]

```csharp
public class RichTextEditorExamples : BaseVM
{
   public RichTextEditorExamples()
   {
      AddProperty<string>("Notes")
         .WithAttribute(new TextAreaFieldAttribute
         {
            Label = "Notes:",
            Placeholder = "Enter your notes here"
         });
   }
}
```

#### Customization

Quill provides several configurable modules such as the toolbar.  To customize them, build a configuration object and pass it through the _config_ attribute.

[inset]
<br/>

```jsx
// Source: https://quilljs.com/docs/modules/toolbar/
const toolbarOptions = [
   [ 'bold', 'italic', 'underline', 'strike' ],
   [ 'blockquote', 'code-block' ],

   [ { header: 1 }, { header: 2 } ],
   [ { list: 'ordered' }, { list: 'bullet' } ],
   [ { script: 'sub' }, { script: 'super' } ],
   [ { indent: '-1' }, { indent: '+1' } ],
   [ { direction: 'rtl' } ],

   [ { size: [ 'small', false, 'large', 'huge' ] } ],
   [ { header: [ 1, 2, 3, 4, 5, 6, false ] } ],

   [ { color: [] }, { background: [] } ],
   [ { font: [] } ],
   [ { align: [] } ],

   [ 'clean' ]
];

const config = {
   modules: {
      toolbar: toolbarOptions
   }
};

const CustomToolbarExample = () => (
   <VMContext vm="CustomToolbarExample">
      <RichTextEditor id="Notes" config={config} />
   </VMContext>
);
```

#### Source

https://github.com/quilljs/quill ([license: BSD 3-Clause (Revised)](https://github.com/quilljs/quill))


#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string.isRequired,

   // Quill configuration (see quilljs.org).
   config: PropTypes.object,

   // Enables the field.
   enable: PropTypes.bool,

   // Text or component for the field's label.
   label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

   // Displays the label text horizontally to the left of the field.
   horizontal: PropTypes.bool,

   // Placeholder text to display when the field is empty.
   placeholder: PropTypes.string,

   // Replaces the input field with plain text.
   plainText: PropTypes.bool,

   // Occurs when the value changes.
   onChange: PropTypes.func
};
```

#### Server-side Attribute

```csharp
public class RichTextEditorAttribute
{
   // Label text of the field.
   public string Label { get; set; }

   // Placeholder text to display when the field is empty.
   public string Placeholder { get; set; }
}
```