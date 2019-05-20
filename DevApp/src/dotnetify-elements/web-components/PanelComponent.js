import createWebComponentCss from '../utils/web-component-css';
import * as utils from '../utils';
import lightTheme from '../theme-light';

export default function createWebComponent(Component, elementName) {
   return createWebComponentCss(Component, elementName, { noMargin: true }, host => {
      const props = host.props;
      const hasCell = [ ...host.children ].some(x => x.nodeName === 'D-CELL');
      const Gap = lightTheme.Panel.Gap;
      const Margin = lightTheme.Panel.Margin;

      const _horizontal = (props.horizontal && !props.bottom) || props.wrap || props.apart;
      const _gap = props.gap || (props.noGap || hasCell ? '0rem' : props.smallGap ? Gap.small : Gap.large);
      let _margin = props.margin || (props.noMargin ? '0rem' : props.smallMargin ? Margin.small : Margin.large);
      let _width = props.width;

      // If wrap is enabled, use negative margin on the outer container to counter the full margin
      // on the child items. Must increase the width too.
      if (props.wrap && host.children.length > 1) {
         _margin = `calc(${_margin} + ${_gap}/2 * -1)`;
         _width = `calc(100% + ${_gap})`;
      }

      const childrenMargin = () => {
         if (props.wrap) return `calc(${_gap}/2)`;
         return _horizontal ? `0 0 0 ${_gap}` : `${_gap} 0 0 0`;
      };

      const childrenStyles = `
            > *:first-child { ${props.wrap ? `margin: ${childrenMargin()}` : ''} }
            > *:not(:first-child) { margin: ${childrenMargin()}; }
         `;

      return `
            display: flex;
            flex: ${props.flex ? props.flex : utils.flexAuto};
            flex-wrap: ${props.wrap ? 'wrap' : 'nowrap'};
            justify-content: ${props.apart ? 'space-between' : props.bottom ? 'flex-end' : props.center ? 'center' : 'flex-start'};
            flex-direction: ${_horizontal ? 'row' : 'column'};
            ${_margin !== '0rem' ? `margin: ${_margin};` : ''}
            ${props.padding ? `padding: ${props.padding};` : ''}
            height: ${props.height || (props.flex ? 'auto' : 'fit-content')};
            width: ${_width || (props.right ? 'auto' : 'inherit')};
            overflow: ${props.flex ? 'auto' : 'unset'};
            ${props.middle ? 'align-items: center;' : ''}
            ${props.right ? (props.horizontal ? 'justify-content: flex-end;' : 'align-items: flex-end;') : ''}
            ${props.css};
            ${childrenStyles};
            ${props.theme ? props.theme.Panel.Container : ''}
         `;
   });
}
