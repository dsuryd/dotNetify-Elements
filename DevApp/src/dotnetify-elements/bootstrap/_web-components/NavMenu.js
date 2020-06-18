import {
  NavDrawerButton,
  NavMenu,
  NavMenuTarget
} from "../_components/NavMenu";
import createWebComponent from "../../utils/web-component";

createWebComponent(NavMenu, "d-nav-menu");
createWebComponent(NavMenuTarget, "d-nav-menu-target");
createWebComponent(NavDrawerButton, "d-nav-drawer-button");

export default NavMenu;
export { NavDrawerButton, NavMenu, NavMenuTarget };
