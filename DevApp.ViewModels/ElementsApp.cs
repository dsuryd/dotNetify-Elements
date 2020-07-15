using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;
using DotNetify.Routing;

namespace dotNetify_Elements
{
   public class ElementsApp : BaseVM, IRoutable
   {
      private enum Route
      {
         Home,
         Introduction,
         WorkingWithForms,
         LayoutSystem,
         Customization,
         GetStarted,
         Form,
         FormDemo,
         FormButton,
         FormCheckbox,
         FormCheckboxGroup,
         FormDateTimeField,
         FormDropdownList,
         FormMultiselectList,
         FormNumberField,
         FormPasswordField,
         FormRadioGroup,
         FormRadioToggle,
         FormRichTextEditor,
         FormTextAreaField,
         FormTextField,
         LayoutDemo,
         LayoutGrid,
         LayoutPanel,
         LayoutTheme,
         StructureCard,
         StructureCell,
         StructureCollapsible,
         StructureField,
         StructureMenu,
         StructureModal,
         StructureTab,
         DisplayAlert,
         DisplayChart,
         DisplayDataGrid,
         DisplayImage,
         DisplayLabel,
         DisplayMarkdown,
         NavigationNavMenu,

         /* Examples */
         ExampleCustomerForm,
         ExampleDashboard,

         Sandbox,
      }

      public RoutingState RoutingState { get; set; }

      private NavMenuItem[] _navMenuItems;

      public ElementsApp()
      {
         this.RegisterRoutes("elements", new List<RouteTemplate>
         {
            new RouteTemplate(nameof(Route.Home))                 { UrlPattern = "", ViewUrl = nameof(Route.Introduction) },
            new RouteTemplate(nameof(Route.Introduction))         { UrlPattern = "intro" },
            new RouteTemplate(nameof(Route.WorkingWithForms))     { UrlPattern = "forms" },
            new RouteTemplate(nameof(Route.LayoutSystem))         { UrlPattern = "layout" },
            new RouteTemplate(nameof(Route.Customization))        { UrlPattern = "customize" },
            new RouteTemplate(nameof(Route.GetStarted))           { UrlPattern = "getstarted" },

            new RouteTemplate(nameof(Route.FormButton))           { UrlPattern = "form/button" },
            new RouteTemplate(nameof(Route.FormCheckbox))         { UrlPattern = "form/checkbox" },
            new RouteTemplate(nameof(Route.FormCheckboxGroup))    { UrlPattern = "form/checkboxgroup" },
            new RouteTemplate(nameof(Route.FormDateTimeField))    { UrlPattern = "form/datetimefield" },
            new RouteTemplate(nameof(Route.FormDropdownList))     { UrlPattern = "form/dropdownlist" },
            new RouteTemplate(nameof(Route.Form))                 { UrlPattern = "form" },
            new RouteTemplate(nameof(Route.FormMultiselectList))  { UrlPattern = "form/multiselect" },
            new RouteTemplate(nameof(Route.FormNumberField))      { UrlPattern = "form/numberfield" },
            new RouteTemplate(nameof(Route.FormPasswordField))    { UrlPattern = "form/passwordfield" },
            new RouteTemplate(nameof(Route.FormRadioGroup))       { UrlPattern = "form/radiogroup" },
            new RouteTemplate(nameof(Route.FormRadioToggle))      { UrlPattern = "form/radiotoggle" },
            new RouteTemplate(nameof(Route.FormRichTextEditor))   { UrlPattern = "form/richtexteditor" },
            new RouteTemplate(nameof(Route.FormTextAreaField))    { UrlPattern = "form/textareafield" },
            new RouteTemplate(nameof(Route.FormTextField))        { UrlPattern = "form/textfield" },
            new RouteTemplate(nameof(Route.FormDemo))             { UrlPattern = "form/demo" },
            new RouteTemplate(nameof(Route.LayoutDemo))           { UrlPattern = "layout/demo" },
            new RouteTemplate(nameof(Route.LayoutGrid))           { UrlPattern = "layout/grid" },
            new RouteTemplate(nameof(Route.LayoutPanel))          { UrlPattern = "layout/panel" },
            new RouteTemplate(nameof(Route.LayoutTheme))          { UrlPattern = "layout/theme" },
            new RouteTemplate(nameof(Route.StructureCard))        { UrlPattern = "structure/card" },
            new RouteTemplate(nameof(Route.StructureCell))        { UrlPattern = "structure/cell" },
            new RouteTemplate(nameof(Route.StructureCollapsible)) { UrlPattern = "structure/collapsible" },
            new RouteTemplate(nameof(Route.StructureField))       { UrlPattern = "structure/field" },
            new RouteTemplate(nameof(Route.StructureMenu))        { UrlPattern = "structure/menu" },
            new RouteTemplate(nameof(Route.StructureModal))       { UrlPattern = "structure/modal" },
            new RouteTemplate(nameof(Route.StructureTab))         { UrlPattern = "structure/tab" },
            new RouteTemplate(nameof(Route.DisplayAlert))         { UrlPattern = "display/alert" },
            new RouteTemplate(nameof(Route.DisplayChart))         { UrlPattern = "display/chart" },
            new RouteTemplate(nameof(Route.DisplayDataGrid))      { UrlPattern = "display/datagrid" },
            new RouteTemplate(nameof(Route.DisplayImage))         { UrlPattern = "display/image" },
            new RouteTemplate(nameof(Route.DisplayLabel))         { UrlPattern = "display/label" },
            new RouteTemplate(nameof(Route.DisplayMarkdown))      { UrlPattern = "display/markdown" },
            new RouteTemplate(nameof(Route.DisplayDataGrid))      { UrlPattern = "list/datagrid" },
            new RouteTemplate(nameof(Route.NavigationNavMenu))    { UrlPattern = "navigation/navmenu" },

            new RouteTemplate(nameof(Route.ExampleCustomerForm))  { UrlPattern = "examples/customerform" },
            new RouteTemplate(nameof(Route.ExampleDashboard))     { UrlPattern = "examples/dashboard" },

            new RouteTemplate(nameof(Route.Sandbox))              { UrlPattern = "sandbox" },
         });

         _navMenuItems = new NavMenuItem[]
         {
            new NavRoute("Introduction",              this.GetRoute(nameof(Route.Introduction))),
            new NavRoute("Working with Forms",        this.GetRoute(nameof(Route.WorkingWithForms))),
            new NavRoute("Layout System",             this.GetRoute(nameof(Route.LayoutSystem))),
            new NavRoute("Customization",             this.GetRoute(nameof(Route.Customization))),
            new NavRoute("Get Started",               this.GetRoute(nameof(Route.GetStarted))),

            new NavGroup
            {
               Label = "Examples",
               Icon = "material-icons web",
               Routes = new NavRoute[]
               {
                  new NavRoute("Customer Form",       this.GetRoute(nameof(Route.ExampleCustomerForm))),
                  new NavRoute("Admin Dashboard",     this.GetRoute(nameof(Route.ExampleDashboard)))
               },
               IsExpanded = true
            },

            new NavGroup
            {
               Label = "Form",
               Routes = new NavRoute[]
               {
                  new NavRoute("Basic Demo",          this.GetRoute(nameof(Route.FormDemo))),
                  new NavRoute("Button",              this.GetRoute(nameof(Route.FormButton))),
                  new NavRoute("Checkbox",            this.GetRoute(nameof(Route.FormCheckbox))),
                  new NavRoute("CheckboxGroup",       this.GetRoute(nameof(Route.FormCheckboxGroup))),
                  new NavRoute("DateTimeField",       this.GetRoute(nameof(Route.FormDateTimeField))),
                  new NavRoute("DropdownList",        this.GetRoute(nameof(Route.FormDropdownList))),
                  new NavRoute("Form",                this.GetRoute(nameof(Route.Form))),
                  new NavRoute("MultiselectList",     this.GetRoute(nameof(Route.FormMultiselectList))),
                  new NavRoute("NumberField",         this.GetRoute(nameof(Route.FormNumberField))),
                  new NavRoute("PasswordField",       this.GetRoute(nameof(Route.FormPasswordField))),
                  new NavRoute("RadioGroup",          this.GetRoute(nameof(Route.FormRadioGroup))),
                  new NavRoute("RadioToggle",         this.GetRoute(nameof(Route.FormRadioToggle))),
                  new NavRoute("RichTextEditor",      this.GetRoute(nameof(Route.FormRichTextEditor))),
                  new NavRoute("TextAreaField",       this.GetRoute(nameof(Route.FormTextAreaField))),
                  new NavRoute("TextField",           this.GetRoute(nameof(Route.FormTextField)))
               },
               IsExpanded = true
            },
            new NavGroup
            {
               Label = "Layout",
               Routes = new NavRoute[]
               {
                  new NavRoute("Basic Demo",          this.GetRoute(nameof(Route.LayoutDemo))),
                  new NavRoute("Layout Grid",         this.GetRoute(nameof(Route.LayoutGrid))),
                  new NavRoute("Panel",               this.GetRoute(nameof(Route.LayoutPanel))),
                  new NavRoute("Theme",               this.GetRoute(nameof(Route.LayoutTheme))),
               },
               IsExpanded = true
            },
            new NavGroup
            {
               Label = "Structure",
               Routes = new NavRoute[]
               {
                  new NavRoute("Card",                this.GetRoute(nameof(Route.StructureCard))),
                  new NavRoute("Cell",                this.GetRoute(nameof(Route.StructureCell))),
                  new NavRoute("Collapsible",         this.GetRoute(nameof(Route.StructureCollapsible))),
                  new NavRoute("Field",               this.GetRoute(nameof(Route.StructureField))),
                  new NavRoute("Menu",                this.GetRoute(nameof(Route.StructureMenu))),
                  new NavRoute("Modal",               this.GetRoute(nameof(Route.StructureModal))),
                  new NavRoute("Tab",                 this.GetRoute(nameof(Route.StructureTab))),
               },
               IsExpanded = true
            },
            new NavGroup
            {
               Label = "Display",
               Routes = new NavRoute[]
               {
                  new NavRoute("Alert",               this.GetRoute(nameof(Route.DisplayAlert))),
                  new NavRoute("Chart",               this.GetRoute(nameof(Route.DisplayChart))),
                  new NavRoute("DataGrid",            this.GetRoute(nameof(Route.DisplayDataGrid))),
                  new NavRoute("Image",               this.GetRoute(nameof(Route.DisplayImage))),
                  new NavRoute("Label",               this.GetRoute(nameof(Route.DisplayLabel))),
                  new NavRoute("Markdown",            this.GetRoute(nameof(Route.DisplayMarkdown))),
               },
               IsExpanded = true
            },
            new NavGroup
            {
               Label = "Navigation",
               Routes = new NavRoute[]
               {
                  new NavRoute("NavMenu",             this.GetRoute(nameof(Route.NavigationNavMenu))),
               },
               IsExpanded = true
            }
         };

         AddProperty("NavMenu", new NavMenu(_navMenuItems))
            .SubscribeTo(AddProperty<string>("Framework").Select(framework => GetNavMenu(framework)));
      }

      private NavMenu GetNavMenu(string framework)
      {
         var navMenuItems = new List<NavMenuItem>(_navMenuItems);
         if (framework == "WebComponent")
         {
            navMenuItems.RemoveAt(navMenuItems.FindIndex(x => (x as NavRoute)?.Route.TemplateId == nameof(Route.Customization)));

            int idx = navMenuItems.FindIndex(x => x.Label == "Layout");
            navMenuItems[idx] = new NavGroup
            {
               Label = navMenuItems[idx].Label,
               Routes = (navMenuItems[idx] as NavGroup).Routes.Where(x => x.Label != "Theme" && x.Label != "Basic Demo").ToArray(),
               IsExpanded = true
            };

            idx = navMenuItems.FindIndex(x => x.Label == "Structure");
            navMenuItems[idx] = new NavGroup
            {
               Label = navMenuItems[idx].Label,
               Routes = (navMenuItems[idx] as NavGroup).Routes.Where(x => x.Label != "Field").ToArray(),
               IsExpanded = true
            };
         }
         return new NavMenu(navMenuItems.ToArray());
      }
   }
}