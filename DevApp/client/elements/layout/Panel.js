import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';

const Container = styled.div`
   display: flex;
   flex: ${props => props.flex};
   ${props => (props.centerAligned ? 'align-items: center;' : '')} justify-content: ${props =>
         props.right ? 'flex-end' : 'flex-start'};
   flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
   margin: ${props => props.margin};
   height: ${props => props.height || (props.flex ? 'auto' : 'fit-content')};
   width: ${props => props.width || (props.left || props.right ? 'auto' : 'inherit')};
   overflow: ${props => (props.flex ? 'auto' : 'unset')} ${props => props.theme.Panel.Container};
`;

const ChildContainer = styled.div`
   ${props => (props.fit ? 'display: flex;' : '')} width: inherit;
   flex: ${props => props.flex};
   padding: ${props => props.padding};
   ${props => props.theme.Panel.ChildContainer};
`;

export class Panel extends React.Component {
   static contextTypes = {
      theme: PropTypes.object
   };

   static propTypes = {
      childProps: PropTypes.object,
      gap: PropTypes.bool,
      noGap: PropTypes.bool,
      smallGap: PropTypes.bool,
      horizontal: PropTypes.bool,
      margin: PropTypes.bool,
      noMargin: PropTypes.bool,
      smallMargin: PropTypes.bool,
      left: PropTypes.bool,
      right: PropTypes.bool,
      centerAligned: PropTypes.bool,
      fit: PropTypes.bool,
      flex: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
      height: PropTypes.string,
      width: PropTypes.string,
      onShow: PropTypes.func
   };

   static defaultProps = {
      noMargin: true
   };

   static componentTypes = {
      Container,
      ChildContainer
   };

   get children() {
      return React.Children.toArray(this.props.children).filter(x => x);
   }

   get numChildren() {
      return React.Children.count(this.children);
   }

   constructor(props) {
      super(props);
      this.state = { showChildren: new Array(this.numChildren).fill(true) };
   }

   getPadding(idx, gap, horizontal) {
      let padding = horizontal ? `0 0 0 ${gap}` : `${gap} 0 0 0`;
      return idx > 0 ? padding : 0;
   }

   getStyle = idx => {
      const showChild = this.state.showChildren[idx] !== false;
      return !showChild ? { display: 'none' } : null;
   };

   handleShow = (idx, show) => {
      setTimeout(() => {
         let showChildren = this.state.showChildren;
         if (showChildren[idx] !== show) {
            showChildren[idx] = show;
            this.setState({ showChildren });
         }
      }, 1);
   };

   render() {
      const [ Container, ChildContainer ] = utils.resolveComponents(Panel, this.props);

      const {
         childProps,
         gap,
         noGap,
         smallGap,
         horizontal,
         margin,
         noMargin,
         smallMargin,
         left,
         right,
         centerAligned,
         height,
         width,
         fit,
         flex
      } = this.props;

      const { Gap, Margin } = this.context.theme.Panel;
      let _gap = gap || (noGap ? '0' : smallGap ? Gap.small : Gap.large);
      let _margin = margin || (noMargin ? '0' : smallMargin ? Margin.small : Margin.large);
      let _flex = typeof flex == 'boolean' ? (flex ? '1' : null) : flex;
      _flex = _flex || fit ? '1' : null;

      return (
         <Container
            margin={_margin}
            horizontal={horizontal}
            left={left}
            right={right}
            centerAligned={centerAligned}
            width={width}
            height={height}
            flex={_flex}
         >
            {this.children.map((child, idx) => {
               return (
                  <ChildContainer
                     key={idx}
                     style={this.getStyle(idx)}
                     flex={child.props.fit ? '1' : null}
                     fit={child.props.fit}
                     padding={this.numChildren <= 1 ? 0 : this.getPadding(idx, _gap, horizontal)}
                  >
                     {React.cloneElement(
                        child,
                        utils.mergeProps(child, childProps, { onShow: show => this.handleShow(idx, show) })
                     )}
                  </ChildContainer>
               );
            })}
         </Container>
      );
   }
}
