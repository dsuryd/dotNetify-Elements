import './bootstrap/override.css';

import dotnetify from 'dotnetify';
import { Element, VMContext, ContextTypes } from './core';

// Display
import { Alert } from './bootstrap/_components/Alert';
import { BarChart, LineChart, PieChart } from './bootstrap/_components/Chart';
import { DataGrid, GridColumn } from './bootstrap/_components/DataGrid';
import { Image } from './bootstrap/_components/Image';
import { Label } from './bootstrap/_components/Label';
import { Markdown, MarkdownTOC } from './bootstrap/_components/Markdown';

// Form
import { Button } from './bootstrap/_components/Button';
import { Checkbox, CheckboxGroup } from './bootstrap/_components/Checkbox';
import { DateField, DateTimeField, TimeField } from './bootstrap/_components/DateTimeField';
import { DropdownList } from './bootstrap/_components/DropdownList';
import { Form } from './bootstrap/_components/Form';
import { MultiselectList } from './bootstrap/_components/MultiselectList';
import { NumberField } from './bootstrap/_components/NumberField';
import { PasswordField } from './bootstrap/_components/PasswordField';
import { RadioGroup } from './bootstrap/_components/RadioGroup';
import { RadioToggle } from './bootstrap/_components/RadioToggle';
import { RichTextEditor } from './bootstrap/_components/RichTextEditor';
import { TextField } from './bootstrap/_components/TextField';
import { TextAreaField } from './bootstrap/_components/TextAreaField';

// Layout
import { Footer, Header, Main, Nav, Section } from './bootstrap/_components/LayoutGrid';
import { Frame, Panel } from './bootstrap/_components/Panel';
import { Theme, withTheme, lightTheme, darkTheme } from './bootstrap/_components/Theme';

// Structure
import { Card, CardImage } from './bootstrap/_components/Card';
import { Cell } from './bootstrap/_components/Cell';
import { Collapsible } from './bootstrap/_components/Collapsible';
import { Field } from './bootstrap/_components/Field';
import { Modal } from './bootstrap/_components/Modal';
import { Tab, TabItem } from './bootstrap/_components/Tab';

// Navigation
import { NavDrawerButton, NavMenu, NavMenuTarget } from './bootstrap/_components/NavMenu';

let dotNetifyElements = {
   /* Core */
   dotnetify,
   ContextTypes,
   Element,
   VMContext,
   /* Bootstrap */
   Alert,
   BarChart,
   Button,
   Card,
   CardImage,
   Cell,
   Checkbox,
   CheckboxGroup,
   Collapsible,
   DataGrid,
   DateField,
   TimeField,
   DateTimeField,
   DropdownList,
   Field,
   Footer,
   Form,
   Frame,
   GridColumn,
   Header,
   Image,
   Label,
   LineChart,
   Main,
   Markdown,
   MarkdownTOC,
   Modal,
   MultiselectList,
   Nav,
   NavDrawerButton,
   NavMenu,
   NavMenuTarget,
   NumberField,
   Panel,
   PasswordField,
   PieChart,
   RadioGroup,
   RadioToggle,
   RichTextEditor,
   Section,
   Tab,
   TabItem,
   TextField,
   TextAreaField,
   Theme,
   withTheme,
   lightTheme,
   darkTheme
};

if (window) window.dotNetifyElements = dotNetifyElements;
module.exports = dotNetifyElements;
