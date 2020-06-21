import createWebComponentCss from "../../utils/web-component-css";
import * as utils from "../../utils";

export function createMainComponent(Component, elementName) {
  return createWebComponentCss(Component, elementName, {}, host => {
    let props = Object.assign({ theme: utils.getDefaultTheme() }, host.props);
    return `
         display: grid;
         display: -ms-grid;
         height: 100%;
         grid-template-columns: auto 1fr;
         grid-template-rows: auto 1fr auto;
         -ms-grid-columns: auto 1fr;
         -ms-grid-rows: auto 1fr auto;
         grid-template-areas: "header header" "nav    section" "nav    footer";
         ${props.theme.Main};
         ${props.css};
      `;
  });
}

export function createHeaderComponent(Component, elementName) {
  return createWebComponentCss(Component, elementName, {}, host => {
    let props = Object.assign({ theme: utils.getDefaultTheme() }, host.props);
    return `
         grid-area: header;
         -ms-grid-row: 1;
         -ms-grid-column-span: 2;
         display: flex;
         align-items: center;
         height: ${props.height || "55px"};
         > * {
            height: inherit;
         }
         z-index: 999;
         ${props.theme.Header};
         ${props.css};
      `;
  });
}

export function createNavComponent(Component, elementName) {
  return createWebComponentCss(Component, elementName, {}, host => {
    let props = Object.assign({ theme: utils.getDefaultTheme() }, host.props);
    return `
         grid-area: nav;
         -ms-grid-column: 1;
         -ms-grid-row: 2;
         -ms-grid-row-span: 2;
         display: flex;
         box-sizing: content-box;
         width: 100%;
         min-width: ${props.width || "250px"};
         overflow: auto;
         visibility: visible;
         transition: all 250ms;
         z-index: 998;
         @media (max-width: 768px) {
            margin-left: -${props.width || "251px"};
            visibility: hidden;
            &.open {
               margin-left: 0;
               visibility: visible;
            }            
         }
         ${props.theme.Nav};
         ${props.css};
   `;
  });
}

export function createFooterComponent(Component, elementName) {
  return createWebComponentCss(Component, elementName, {}, host => {
    let props = Object.assign({ theme: utils.getDefaultTheme() }, host.props);
    return `
         grid-area: footer;
         -ms-grid-row: 3;
         -ms-grid-column-span: 2;
         display: flex;
         height: ${props.height || "50px"};
         ${props.theme.Footer};
         ${props.css};
      `;
  });
}

export function createSectionComponent(Component, elementName) {
  return createWebComponentCss(Component, elementName, {}, host => {
    let props = Object.assign({ theme: utils.getDefaultTheme() }, host.props);
    return `
         grid-area: section;
         -ms-grid-column: 2;
         -ms-grid-row: 2;
         overflow: auto;
         display: flex;
         flex-direction: column;
         > * {
            height: inherit;
         }
         ${props.theme.Section};
         ${props.css};
      `;
  });
}
