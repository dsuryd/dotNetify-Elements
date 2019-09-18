import { Footer, Header, Main, Nav, Section } from '../_components/LayoutGrid';
import * as webComponent from '../../web-components/LayoutGridComponent';

webComponent.createMainComponent(Main, 'd-main');
webComponent.createHeaderComponent(Header, 'd-header');
webComponent.createNavComponent(Nav, 'd-nav');
webComponent.createFooterComponent(Footer, 'd-footer');
webComponent.createSectionComponent(Section, 'd-section');

export default Main;
export { Footer, Header, Main, Nav, Section };
