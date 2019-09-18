import { Main, Header, Nav, Footer, Section } from '../../layout/LayoutGrid';

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Main, Footer, Header, Nav, Section };

export default Main;
export { Footer, Header, Main, Nav, Section };
