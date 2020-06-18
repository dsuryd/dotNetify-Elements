import { NavMenu, NavMenuTarget } from "../../nav/NavMenu";
import { NavDrawerButton } from "../../nav/NavDrawerButton";

const window = window || global || {};
window.dotNetifyElements = {
  ...window.dotNetifyElements,
  NavMenu,
  NavDrawerButton,
  NavMenuTarget
};

export default NavMenu;
export { NavDrawerButton, NavMenu, NavMenuTarget };
