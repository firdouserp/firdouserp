import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { Children, createElement, useCallback } from "react";
import { DatagridBody, DatagridHeaderCell, DatagridLoading } from "react-admin";

const MyDatagrid = (props) => {
  const {
    basePath,
    children,
    currentSort,
    data,
    hover,
    ids,
    loading,
    loaded,
    onSelect,
    onToggleItem,
    resource,
    rowClick,
    rowStyle,
    selectedIds,
    setSort,
    total,
    version,
    ...rest
  } = props;

  /**
   * Define the aggregation logic by field here
   */
  const getTotalForField = (field) => {
    // something like
    return ids.map((id) => data[id][field]).reduce((acc, curr) => acc + curr);
  };

  // the rest of the code is loosely copied from react-admin's Datagrid component source, simplified for comprehension

  const updateSort = useCallback(
    (event) => {
      event.stopPropagation();
      setSort(event.currentTarget.dataset.sort);
    },
    [setSort]
  );

  const handleSelectAll = useCallback(
    (event) => {
      if (event.target.checked) {
        onSelect(ids.concat(selectedIds.filter((id) => !ids.includes(id))));
      } else {
        onSelect([]);
      }
    },
    [ids, onSelect, selectedIds]
  );

  if (loaded === false) {
    return (
      <DatagridLoading
        expand={false}
        hasBulkActions={false}
        nbChildren={React.Children.count(children)}
        //size={size}
      />
    );
  }

  if (loaded && (ids.length === 0 || total === 0)) {
    return null;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {Children.map(children, (field, index) => (
            <DatagridHeaderCell
              currentSort={currentSort}
              field={field}
              isSorting={
                currentSort.field === (field.props.sortBy || field.props.source)
              }
              key={field.props.source || index}
              resource={resource}
              updateSort={updateSort}
            />
          ))}
        </TableRow>
      </TableHead>
      {createElement(
        DatagridBody,
        {
          basePath,

          rowClick,
          data,

          hover,
          ids,
          onToggleItem,
          resource,
          rowStyle,
          selectedIds,
          version,
        },
        children
      )}

      <tfoot>
        <tr>
          {Children.map(children, (field, index) => (
            <td key={index}>{getTotalForField(field.props.source)}</td>
          ))}
        </tr>
      </tfoot>
    </Table>
  );
};

MyDatagrid.defaultProps = {
  data: {},
  hasBulkActions: false,
  ids: [],
  selectedIds: [],
};

export default MyDatagrid;
