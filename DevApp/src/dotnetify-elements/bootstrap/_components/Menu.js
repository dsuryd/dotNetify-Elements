import { Menu } from "../../structure/Menu";

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Menu };

export default Menu;
export { Menu };
