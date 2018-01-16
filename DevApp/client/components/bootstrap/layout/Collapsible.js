import React from 'react';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';

const Container = styled.div`
`;

const ToggleContainer = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   &:hover {
      cursor: pointer;
  }   
`;

const Label = styled.div`
`;

export class Collapsible extends React.Component {

   constructor(props) {
      super(props);
      this.state = { open: props.isOpen || true };
   }

   handleClick = _ => this.setState({ open: !this.state.open });

   render() {
      let _Container = this.props.Container || Container;
      let _ToggleContainer = this.props.toggleContainer || ToggleContainer;
      let _Label = this.props.labelComponent || Label;

      return (
         <_Container>
            <_ToggleContainer onClick={this.handleClick}>
               <_Label isOpen={this.state.open}>{this.props.label}</_Label>
            </_ToggleContainer>
            <Collapse isOpen={this.state.open}>
               {this.props.children}
            </Collapse>
         </_Container>
      );
   }
}