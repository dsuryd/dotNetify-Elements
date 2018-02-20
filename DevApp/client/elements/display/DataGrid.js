import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

const Container = styled.div`
   display: flex;
   flex: 1;
   width: 100%;
   ${props => props.theme.DataGrid.Container}
`;

export class DataGrid extends React.Component {

   static contextTypes = ContextTypes;

   static componentTypes = {
      Container,
      DataGridComponent: undefined
   }

   constructor(props) {
      super(props);
      this.state = { height: 400 };
   }

   get vmProperty() {
      return utils.getVMProperty(this);
   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.updateHeight);
   }

   componentDidMount() {
      this.updateHeight();
      window.addEventListener("resize", this.updateHeight);
   }

   componentDidUpdate() {
      this.updateHeight();
   }

   updateHeight = _ => {
      if (this.elem && this.state.height != this.elem.offsetHeight)
         this.setState({ height: this.elem.offsetHeight });
   }

   mapColumns(children, columns) {
      return columns.map(col => {
         col = utils.toCamelCase(col);
         col.width = utils.toPixel(col.width);
         const gridColumn = utils.filterChildren(children, child => child.type == GridColumn && child.props.id === col.key).shift().shift();
         if (gridColumn) {
            const { width, formatter, columnChildren } = gridColumn.props;
            col.width = utils.toPixel(width || col.width);
            col.formatter = formatter || (columnChildren ? React.Children.only(columnChildren) : null);
         }
         return col;
      })
   }

   render() {
      const [Container, _DataGrid] = utils.resolveComponents(DataGrid, this.props);
      const { children, ...props } = this.props;
      const { id, value, attrs } = this.vmProperty.props;

      const { columns } = attrs;
      const rowGetter = idx => value[idx];

      return (
         <Container innerRef={elem => this.elem = elem}>
            <_DataGrid id={id}
               columns={this.mapColumns(children, columns)}
               rowGetter={rowGetter}
               rowsCount={value.length}
               minHeight={this.state.height}
               {...props}
            />
         </Container>
      );
   }
}

export class GridColumn extends React.Component {

   static propTypes = {
      id: PropTypes.string.isRequired,
      width: PropTypes.string,
      formatter: PropTypes.func,
      children: PropTypes.node
   }
   render() {
      return this.props.children;
   }
}