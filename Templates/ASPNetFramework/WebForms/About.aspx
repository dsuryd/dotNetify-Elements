<%@ Page Title="DotNetify-Elements Demo" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="About.aspx.cs" Inherits="WebForms.About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
   <h2><%: Title %>.</h2>
   <div id="Mount"></div>
   <script type="text/babel" src="Scripts/demo.js"></script>
</asp:Content>