import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Element from '../Element';
import * as utils from '../utils';

const Container = styled.div`
   display: flex;
   flex: 1;
   width: 100%;
   ${props => props.theme.DataGrid.Container};
`;

export class DataGrid extends Element {
   static propTypes = {
      id: PropTypes.string.isRequired,
      height: PropTypes.string,
      rowHeight: PropTypes.string,
      onSelect: PropTypes.func,
      disable: PropTypes.bool
   };

   static defaultProps = {
      rowHeight: '35px',
      height: '400px'
   };

   static componentTypes = {
      Container,
      DataGridComponent: undefined
   };

   constructor(props) {
      super(props);
      this.state = { height: utils.toPixel(this.props.height) };
   }

   componentWillMount() {
      this.canSelect = [ 'Single', 'Multiple' ].includes(this.attrs.selectMode);
      this.isMultiselect = this.attrs.selectMode === 'Multiple';
      this.selectedKeyProperty = this.attrs.selectedKeyProperty;
      this.updateSelectedKey();
   }

   componentDidMount() {
      window.addEventListener('resize', this.updateHeight);
      this.updateHeight();
   }

   componentWillUpdate() {
      this.updateSelectedKey();
   }

   componentDidUpdate() {
      this.updateHeight();
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.updateHeight);
   }

   mapColumns(children, columns) {
      // For each column, find the GridColumn element with a matching name.  The element will provide information
      // to customize the column, such as width and the formatter to format the column text.
      return columns.map(col => {
         col = utils.toCamelCase(col);
         col.width = utils.toPixel(col.width);

         const [ gridColumns, rest ] = utils.filterChildren(children, child => child.type == GridColumn && child.props.id === col.key);
         const gridCol = gridColumns.shift();
         if (gridCol) {
            const { width, formatter, columnChildren } = gridCol.props;
            col.width = utils.toPixel(width || col.width);
            col.formatter = formatter || (columnChildren ? React.Children.only(columnChildren) : null);
         }

         return col;
      });
   }

   updateSelectedKey() {
      if (this.selectedKeyProperty) {
         const selectedKey = this.vmProperty.vmState[this.selectedKeyProperty];
         if (!utils.deepEqual(selectedKey, this.state.selectedKey)) {
            this.setState({ selectedKey: selectedKey });
            this.props.onSelect && this.props.onSelect(selectedKey);

            // Make sure the selected row is visible.
            const visibleKey = this.isMultiselect ? selectedKey.shift() : selectedKey;
            const rowIdx = this.value.findIndex(x => x[this.attrs.rowKey] === selectedKey);
            this.handleScrollToRow(rowIdx);
         }
      }
   }

   select(key) {
      const isChanged = this.isMultiselect ? !this.state.selectedKey.includes(key) : this.state.selectedKey != key;
      if (isChanged) {
         const selectedKey = this.isMultiselect ? [ key, ...this.state.selectedKey ] : key;
         this.dispatchSelection(selectedKey);
         this.setState({ selectedKey: selectedKey });
         if (this.selectedKeyProperty) this.vmProperty.vmState[this.selectedKeyProperty] = selectedKey;
      }
   }

   deselect(keys) {
      const selectedKey = this.isMultiselect ? this.state.selectedKey.filter(key => !keys.includes(key)) : null;
      this.dispatchSelection(selectedKey);
      this.setState({ selectedKey: selectedKey });
      if (this.selectedKeyProperty) this.vmProperty.vmState[this.selectedKeyProperty] = selectedKey;
   }

   dispatchSelection(value) {
      this.selectedKeyProperty && this.dispatchProp(this.selectedKeyProperty, value);
      this.props.onSelect && this.props.onSelect(value);
   }

   sort = (sortColumn, sortDirection) => {
      const comparer = (a, b) =>
         sortDirection == 'ASC' ? (a[sortColumn] > b[sortColumn] ? 1 : -1) : sortDirection == 'DESC' ? (a[sortColumn] < b[sortColumn] ? 1 : -1) : null;

      if (!this.unsortedValue) this.unsortedValue = [ ...this.value ];
      this.value = sortDirection !== 'NONE' ? this.value.sort(comparer) : [ ...this.unsortedValue ];
   };

   updateHeight = _ => {
      // Adjust the grid's height to the available space.
      if (this.elem && this.state.height != this.elem.offsetHeight) {
         this.setState({ height: this.elem.offsetHeight });
      }
   };

   handleSelectBy = _ => {
      return this.attrs.rowKey
         ? {
              keys: {
                 rowKey: this.attrs.rowKey,
                 values: this.isMultiselect ? this.state.selectedKey : [ this.state.selectedKey ]
              }
           }
         : { indexes: this.isMultiselect ? this.state.selectedKey : [ this.state.selectedKey ] };
   };

   handleRowClick = (idx, row) => {
      if (row && this.canSelect && !this.props.disable) {
         const selectedKey = this.attrs.rowKey ? row[this.attrs.rowKey] : idx;
         this.select(selectedKey);
      }
   };

   handleRowsSelected = rows => {
      rows.map(row => this.handleRowClick(row.rowIdx, row.row));
   };

   handleRowsDeselected = rows => {
      const deselectedKeys = rows.map(row => (this.attrs.rowKey ? row.row[this.attrs.rowKey] : row.rowIdx));
      this.deselect(deselectedKeys);
   };

   handleScrollToRow(idx) {
      if (this.gridDom) {
         var top = this.gridDom.getRowOffsetHeight() * idx;
         var gridCanvas = this.gridDom.getDataGridDOMNode().querySelector('.react-grid-Canvas');
         if (top < gridCanvas.scrollTop || top > gridCanvas.scrollTop + this.state.height - 2 * utils.toPixel(this.attrs.rowHeight)) {
            gridCanvas.scrollTop = top;
         }
      }
      else setTimeout(_ => this.handleScrollToRow(idx), 0);
   }

   render() {
      const [ Container, _DataGrid ] = utils.resolveComponents(DataGrid, this.props);
      const { fullId, rowKey, columns, rows, height, rowHeight, children, ...props } = this.attrs;

      const rowGetter = idx => this.value[idx];
      const minHeight = rows ? (rows + 1) * utils.toPixel(rowHeight) + 2 : this.state.height;

      return (
         <Container innerRef={elem => (this.elem = elem)}>
            <_DataGrid
               id={fullId}
               columns={this.mapColumns(children, columns)}
               rowGetter={rowGetter}
               rowsCount={this.value.length}
               rowHeight={utils.toPixel(rowHeight)}
               minHeight={minHeight}
               height={minHeight}
               onRowClick={this.handleRowClick}
               onGridSort={this.sort}
               rowSelection={{
                  showCheckbox: this.isMultiselect,
                  onRowsSelected: this.handleRowsSelected,
                  onRowsDeselected: this.handleRowsDeselected,
                  selectBy: this.handleSelectBy()
               }}
               ref={elem => (this.gridDom = elem)}
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
   };

   render() {
      return this.props.children;
   }
}
