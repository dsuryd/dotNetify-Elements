import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Element from '../Element';
import * as utils from '../utils';

const Container = styled.div`
   display: flex;
   flex: 1;
   width: 100%;
   ${props => props.theme.DataGrid.Container}
`;

export class DataGrid extends Element {

   static propTypes = {
      id: PropTypes.string.isRequired,
      rowHeight: PropTypes.string,
      onSelect: PropTypes.func,
      disabled: PropTypes.bool
   }

   static defaultProps = {
      rowHeight: "35px"
   }

   static componentTypes = {
      Container,
      DataGridComponent: undefined
   }

   constructor(props) {
      super(props);
      this.state = { height: 400, selectedKeys: [] };
      this.gridAttrs = {};
   }

   get canSelect() {
      return ["Single", "Multiple"].includes(this.gridAttrs.selectMode) && !this.props.disabled;
   }

   get isMultiselect() {
      return this.gridAttrs.selectMode === "Multiple";
   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.updateHeight);
   }

   componentDidMount() {
      window.addEventListener("resize", this.updateHeight);
      setTimeout(() => this.updateHeight(), 0);
   }

   componentDidUpdate() {
      setTimeout(() => this.updateHeight(), 0);
   }

   mapColumns(children, columns) {
      return columns.map(col => {
         col = utils.toCamelCase(col);
         col.width = utils.toPixel(col.width);

         const [gridColumns, rest] = utils.filterChildren(children, child => child.type == GridColumn && child.props.id === col.key);
         const gridCol = gridColumns.shift();
         if (gridCol) {
            const { width, formatter, columnChildren } = gridCol.props;
            col.width = utils.toPixel(width || col.width);
            col.formatter = formatter || (columnChildren ? React.Children.only(columnChildren) : null);
         }

         return col;
      })
   }

   configureSelectBy = _ => {
      return this.gridAttrs.rowKey ? { keys: { rowKey: this.gridAttrs.rowKey, values: this.state.selectedKeys } } : { indexes: this.state.selectedKeys };
   }

   dispatchSelection(value) {
      this.gridAttrs.selectedKeyProperty && this.dispatchProp(this.gridAttrs.selectedKeyProperty, value);
      this.props.onSelect && this.props.onSelect(value);
   }

   handleGridSort = (sortColumn, sortDirection) => {
      const comparer = (a, b) =>
         sortDirection == "ASC" ? (a[sortColumn] > b[sortColumn] ? 1 : -1)
            : sortDirection == "DESC" ? (a[sortColumn] < b[sortColumn] ? 1 : -1)
               : null;

      if (!this.unsortedValue)
         this.unsortedValue = [...this.value];
      this.value = sortDirection !== 'NONE' ? this.value.sort(comparer) : [...this.unsortedValue];
   };

   handleRowClick = (idx, row) => {
      if (!row || !this.canSelect)
         return;

      const selectedKey = this.gridAttrs.rowKey ? row[this.gridAttrs.rowKey] : idx;
      if (!this.state.selectedKeys.includes(selectedKey)) {
         const selectedKeys = this.isMultiselect ? [selectedKey, ...this.state.selectedKeys] : [selectedKey];
         this.dispatchSelection(this.isMultiselect ? selectedKeys : selectedKey);
         this.setState({ selectedKeys: selectedKeys });
      }
   }

   handleRowsSelected = rows => {
      rows.map(row => this.handleRowClick(row.rowIdx, row.row))
   }

   handleRowsDeselected = rows => {
      const deselectedKeys = rows.map(row => this.gridAttrs.rowKey ? row.row[this.gridAttrs.rowKey] : row.rowIdx);
      const selectedKeys = this.state.selectedKeys.filter(key => !deselectedKeys.includes(key));
      this.dispatchSelection(this.isMultiselect ? selectedKeys : selectedKeys.shift());
      this.setState({ selectedKeys: selectedKeys });
   }

   updateHeight = _ => {
      if (this.elem && this.state.height != this.elem.offsetHeight)
         this.setState({ height: this.elem.offsetHeight });
   }

   render() {
      const [Container, _DataGrid] = utils.resolveComponents(DataGrid, this.props);
      const { fullId, rowKey, columns, rows, canSelect, rowHeight, children, ...props } = this.attrs;

      const rowGetter = idx => this.value[idx];
      const height = rows ? (rows + 1) * utils.toPixel(rowHeight) + 2 : null;
      this.gridAttrs = this.attrs;

      return (
         <Container innerRef={elem => this.elem = elem}>
            <_DataGrid id={fullId}
               columns={this.mapColumns(children, columns)}
               rowGetter={rowGetter}
               rowsCount={this.value.length}
               rowHeight={utils.toPixel(rowHeight)}
               minHeight={height || this.state.height}
               onRowClick={this.handleRowClick}
               onGridSort={this.handleGridSort}
               rowSelection={{
                  showCheckbox: this.isMultiselect,
                  onRowsSelected: this.handleRowsSelected,
                  onRowsDeselected: this.handleRowsDeselected,
                  selectBy: this.configureSelectBy()
               }}
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