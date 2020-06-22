import createWebComponentCss from "../../utils/web-component-css";
import * as utils from "../../utils";

export default function createTabComponent(Component, elementName) {
  return createWebComponentCss(Component, elementName, {}, host => {
    const props = Object.assign({ theme: utils.getDefaultTheme() }, host.props);

    if (host.childNodes.length > 0) {
      let tabElem = host.querySelector(".nav-tabs");
      if (!tabElem) {
        const active = host.getAttribute("active");
        const tabItems = [...host.childNodes].filter(x => x.nodeName === "D-TAB-ITEM");
        const activeNode = tabItems.find(x => x.getAttribute("itemkey") === active) || tabItems[0];

        tabElem = utils.addChildNode(host, "ul", "nav nav-tabs", true);

        const panelElem = utils.addChildNode(host, "d-panel");
        panelElem.setAttribute("nomargin", "false");

        tabItems.forEach(node => {
          const itemKey = node.getAttribute("itemkey");
          const itemElem = utils.addChildNode(tabElem, "li", "nav-item");
          const activeCss = node === activeNode ? "active" : "";
          itemElem.innerHTML = `<div id=${itemKey} class='nav-link ${activeCss}'>${node.getAttribute("label")}</div>`;
          itemElem.onclick = () => {
            tabItems.forEach(x => {
              x.style.display = x === node ? "block" : "none";
            });
            tabElem.querySelector(".nav-link.active").classList.remove("active");
            tabElem.querySelector(`#${itemKey}.nav-link`).classList.add("active");
          };

          node.style.display = node === activeNode ? "block" : "none";
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
        ${props.css};
      `;
  });
}

export function createTabItemComponent(Component, elementName) {
  return createWebComponentCss(Component, elementName, {}, host => {
    const props = Object.assign({ theme: utils.getDefaultTheme() }, host.props);
    return `
         ${props.css};
      `;
  });
}
