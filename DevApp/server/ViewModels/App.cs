using System.Collections.Generic;
using DotNetify;
using DotNetify.Elements;
using DotNetify.Routing;

namespace dotNetify_Elements
{
   public class App : BaseVM, IRoutable
   {
      private enum Route
      {
         Home,
         Introduction,
         Form,
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
         FormTextAreaField,
         FormTextField,
         FormDemo,
         FormValidationDemo,
         DataGridDemo,
         CustomerInfoPage
      }

      public RoutingState RoutingState { get; set; }

      public App()
      {
         this.RegisterRoutes("/", new List<RouteTemplate>
         {
            new RouteTemplate(nameof(Route.Home))                 { UrlPattern = "", ViewUrl = nameof(Route.Introduction) },
            new RouteTemplate(nameof(Route.Introduction))         { UrlPattern = "intro" },
            new RouteTemplate(nameof(Route.Form))                 { UrlPattern = "form" },
            new RouteTemplate(nameof(Route.FormButton))           { UrlPattern = "form/button" },
            new RouteTemplate(nameof(Route.FormCheckbox))         { UrlPattern = "form/checkbox" },
            new RouteTemplate(nameof(Route.FormCheckboxGroup))    { UrlPattern = "form/checkboxgroup" },
            new RouteTemplate(nameof(Route.FormDateTimeField))    { UrlPattern = "form/datetimefield" },
            new RouteTemplate(nameof(Route.FormDropdownList))     { UrlPattern = "form/dropdownlist" },
            new RouteTemplate(nameof(Route.FormMultiselectList))  { UrlPattern = "form/multiselect" },
            new RouteTemplate(nameof(Route.FormNumberField))      { UrlPattern = "form/numberfield" },
            new RouteTemplate(nameof(Route.FormPasswordField))    { UrlPattern = "form/passwordfield" },
            new RouteTemplate(nameof(Route.FormRadioGroup))       { UrlPattern = "form/radiogroup" },
            new RouteTemplate(nameof(Route.FormRadioToggle))      { UrlPattern = "form/radiotoggle" },
            new RouteTemplate(nameof(Route.FormTextAreaField))    { UrlPattern = "form/textareafield" },
            new RouteTemplate(nameof(Route.FormTextField))        { UrlPattern = "form/textfield" },
            new RouteTemplate(nameof(Route.FormDemo))             { UrlPattern = "form/demo" },
            new RouteTemplate(nameof(Route.FormValidationDemo))   { UrlPattern = "form/validationdemo" },
            new RouteTemplate(nameof(Route.DataGridDemo))         { UrlPattern = "list/datagrid" },
            new RouteTemplate(nameof(Route.CustomerInfoPage))     { UrlPattern = "examples/customer-info" },
         });

         AddProperty("NavMenu", new NavMenu(
            new NavMenuItem[]
            {
               new NavRoute("Introduction", this.GetRoute(nameof(Route.Introduction))),
               new NavGroup
               {
                  Label = "Form",
                  Icon = "far fa-edit",
                  Routes = new NavRoute[]
                  {
                     new NavRoute("DateTimeField",    this.GetRoute(nameof(Route.FormDateTimeField))),
                     new NavRoute("DropdownList",     this.GetRoute(nameof(Route.FormDropdownList))),
                     new NavRoute("MultiselectList",  this.GetRoute(nameof(Route.FormMultiselectList))),
                     new NavRoute("NumberField",      this.GetRoute(nameof(Route.FormNumberField))),
                     new NavRoute("PasswordField",    this.GetRoute(nameof(Route.FormPasswordField))),
                     new NavRoute("RadioGroup",       this.GetRoute(nameof(Route.FormRadioGroup))),
                     new NavRoute("RadioToggle",      this.GetRoute(nameof(Route.FormRadioToggle))),
                     new NavRoute("TextAreaField",    this.GetRoute(nameof(Route.FormTextAreaField))),
                     new NavRoute("TextField",        this.GetRoute(nameof(Route.FormTextField))),
                     new NavRoute("Form Demo",        this.GetRoute(nameof(Route.FormDemo))),
                     new NavRoute("Validation Demo",  this.GetRoute(nameof(Route.FormValidationDemo)))
                  }
               },
               new NavGroup
               {
                  Label = "List",
                  Icon = "far fa-list-alt",
                  Routes = new NavRoute[]
                  {
                     new NavRoute("Data Grid", this.GetRoute(nameof(Route.DataGridDemo)), "far fa-list-alt"),
                  }
               },

               new NavGroup
               {
                  Label = "Examples",
                  Icon = "far fa-id-card",
                  Routes = new NavRoute[]
                  {
                     new NavRoute("Customer Info Page",   this.GetRoute(nameof(Route.CustomerInfoPage))),
                  }
               },
            }));
      }
   }
}