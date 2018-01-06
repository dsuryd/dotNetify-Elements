using System;
using System.Collections.Generic;
using System.Linq;
using DotNetify;

namespace dotNetify_Elements {
    public class FormDemo : BaseVM {
        public FormDemo () {
            AddProperty ("MyText", "")
                .SetAttribute (this, new TextField { Label = "Text:", Placeholder = "Enter text" });

            AddProperty ("MyEmail", "email_address@server.com")
                .SetAttribute (this, new TextField { Label = "Email:", Placeholder = "Enter email address" });

            AddProperty ("MyPassword", "")
                .SetAttribute (this, new TextField { Label = "Password:", Placeholder = "Enter password" });

            AddProperty ("MyDropdown", "D3")
                .SetAttribute (this, new DropdownList {
                    Label = "Dropdown list:",
                        Options = new Dictionary<string, string> { { "D1", "Dropdown 1" },
                            { "D2", "Dropdown 2" },
                            { "D3", "Dropdown 3" },
                            { "D4", "Dropdown 4" },
                            { "D5", "Dropdown 5" }
                        }.ToArray ()
                });

            AddProperty ("MyTextArea", "")
                .SetAttribute (this, new TextField { Label = "Text area:", Placeholder = "Enter text" });

            AddProperty ("MyRadio", "R1")
                .SetAttribute (this, new RadioGroup {
                    Label = "Radio Group:",
                        Options = new Dictionary<string, string> { { "R1", "Radio 1" },
                            { "R2", "Radio 2" },
                            { "R3", "Radio 3" }
                        }.ToArray ()
                });

            AddProperty ("MyCheckbox", true)
                .SetAttribute (this, new Checkbox { Label = "Check me" });

            AddProperty ("MyCheckboxGroup", new string[] { "C1", "C3" })
                .SetAttribute (this, new RadioGroup {
                    Label = "Checkbox Group:",
                        Options = new Dictionary<string, string> { { "C1", "Checkbox 1" },
                            { "C2", "Checkbox 2" },
                            { "C3", "Checkbox 3" }
                        }.ToArray ()
                });
        }
    }

    public class HorizontalFormDemo : FormDemo { }
}