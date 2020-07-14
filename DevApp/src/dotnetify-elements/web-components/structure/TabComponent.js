import createWebComponentCss from "../../utils/web-component-css";
import * as utils from "../../utils";

export default function createTabComponent(Component, elementName) {
  return createWebComponentCss(Component, elementName, {}, host => {
    const props = Object.assign({ theme: utils.getDefaultTheme() }, host.props);

    if (host.children.length > 0) {
      const children = [...host.children];
      let tabElem = children.find(x => x.classList.contains("nav-tabs"));
      if (!tabElem) {
        const active = host.getAttribute("active");
        const tabItems = children.filter(x => x.nodeName === "D-TAB-ITEM");
        const activeNode = tabItems.find(x => x.getAttribute("itemkey") === active) || tabItems[0];

        tabElem = utils.addChildNode(host, "ul", "nav nav-tabs", true);

        const panelElem = utils.addChildNode(host, "d-panel");
        panelElem.setAttribute("nomargin", "false");
        panelElem.setAttribute("nogap", "true");

        tabItems.forEach(node => {
          const itemKey = node.getAttribute("itemkey");
          const itemElem = utils.addChildNode(tabElem, "li", "nav-item");
          const activeCss = node === activeNode ? "active" : "";
          itemElem.innerHTML = `<div id=${itemKey} class='nav-link ${activeCss}'>${node.getAttribute("label")}</div>`;
          itemElem.onclick = handleTabClick;
          itemElem.onkeydown = handleTabClick;

          if (node === activeNode) node.classList.add("active");
          if (node === activeNode) {
            document.createAttribute("active");
            // Have to use attribute because when inside React modal, cannot do querySelector with class (it changes to classname).
            node.setAttribute("active", "true");
          }
          panelElem.appendChild(node);
        });
      }
    }

    return `
        .nav .nav-tabs {
          height: inherit;
          ${props.theme.Tab.TabItemContainer}
        }
        .nav-item {
          padding-bottom: 0;
          ${props.theme.Tab.TabItem}
        }
        .nav-link {
          &:hover {
            cursor: pointer;
          }
        }
        d-tab-item {
          display: none;
          &.active, &[active] { display: block }
        }
        ${props.css};
      `;
  });
}

export function createTabItemComponent(Component, elementName) {
  const component = createWebComponentCss(Component, elementName, {}, host => {
    const props = Object.assign({ theme: utils.getDefaultTheme() }, host.props);
    return `
         ${props.css};
      `;
  });
  component.prototype.handleClick = () => {
    alert(this);
  };
  return component;
}

export function handleTabClick(e) {
  if (e.key && e.key !== "Enter") return true;
  const elemItemKey = e.target.id;
  const host = e.target.closest("d-tab");

  let active = host.querySelector("d-tab-item.active");
  active && active.classList.remove("active");
  active = host.querySelector("d-tab-item[active]");
  active && active.removeAttribute("active");
  host.querySelector(`d-tab-item[itemkey="${elemItemKey}"]`).classList.add("active");
  host.querySelector(".nav-link.active").classList.remove("active");
  host.querySelector(`#${elemItemKey}.nav-link`).classList.add("active");
}
