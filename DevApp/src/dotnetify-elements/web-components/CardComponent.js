import createWebComponentCss from "../utils/web-component-css";
import * as utils from "../utils";

export default function createCardComponent(Component, elementName) {
  return createWebComponentCss(Component, elementName, {}, host => {
    const props = Object.assign({ theme: utils.getDefaultTheme() }, host.props);

    if (host.childNodes.length > 0) {
      let cardDiv = host.querySelector(".card");
      if (!cardDiv) {
        cardDiv = utils.addChildNode(host, "div", "card");

        const cardImgHeaderCss = props.horizontal ? "card-img-left" : "card-img-top";
        const cardImgFooterCss = props.horizontal ? "card-img-right" : "card-img-bottom";

        const cardImgHeaderDiv = utils.addChildNode(cardDiv, "div", cardImgHeaderCss);
        const cardHeaderDiv = utils.addChildNode(cardDiv, "div", "card-header");
        const cardBodyDiv = utils.addChildNode(cardDiv, "div", "card-body");
        const cardFooterDiv = utils.addChildNode(cardDiv, "div", "card-footer");
        const cardImgFooterDiv = utils.addChildNode(cardDiv, "div", cardImgFooterCss);

        while (host.childNodes.length > 1) {
          const node = host.childNodes[0];
          if (node.nodeName === "HEADER") cardHeaderDiv.appendChild(node);
          else if (node.nodeName === "FOOTER") cardFooterDiv.appendChild(node);
          else if (["IMG", "D-IMAGE", "D-CARD-IMAGE"].includes(node.nodeName)) {
            if (host.childNodes.length > 2) cardImgHeaderDiv.appendChild(node);
            else cardImgFooterDiv.appendChild(node);
          } else cardBodyDiv.appendChild(node);
        }
      } else {
        let oldName = "card-img-" + (props.horizontal ? "top" : "left");
        let newName = "card-img-" + (props.horizontal ? "left" : "top");
        host.querySelectorAll("." + oldName).forEach(x => {
          x.classList.remove(oldName);
          x.classList.add(newName);
        });

        oldName = "card-img-" + (props.horizontal ? "bottom" : "right");
        newName = "card-img-" + (props.horizontal ? "right" : "bottom");
        host.querySelectorAll("." + oldName).forEach(x => {
          x.classList.remove(oldName);
          x.classList.add(newName);
        });
      }

      [...cardDiv.childNodes].forEach(x => !x.childNodes.length && cardDiv.removeChild(x));
    }

    return `
         .card {
            height: inherit;
            flex: ${utils.flexAuto};
            ${props.horizontal ? "flex-direction: row;" : ""}
            width: ${props.width ? props.width : "inherit"};
            ${props.theme.Card.Container};
         }
         .card-header {
            ${props.theme.Card.HeaderContainer};
         }
         .card-body {
            ${props.theme.Card.BodyContainer};
         }
         .card-header {
            ${props.theme.Card.FooterContainer};
         } 
         [class*="card-img-"] {
            img {
               ${props.horizontal ? "height: auto" : "width: 100%"};
            }
             ${props.theme.Card.ImageContainer};
         }                       
         ${props.css};
      `;
  });
}

export function createCardImageComponent(Component, elementName) {
  return createWebComponentCss(Component, elementName, {}, host => {
    const props = Object.assign({ theme: utils.getDefaultTheme() }, host.props);
    return `
      display: block;
      ${props.css};      
      `;
  });
}
