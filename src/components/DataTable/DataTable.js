import React, { useMemo, useState } from "react";

import { EuiDataGrid } from "@elastic/eui";
import _ from "lodash";

import { schemaDetectorsByType } from "./schemas";

function doSort(data, columnsById, sortOrder, renderContext) {
  return [...data].sort((a, b) => {
    for (const column of sortOrder) {
      const columnSchema = schemaDetectorsByType.get(
        columnsById.get(column.id).schema
      );

      const aValue = a.get(column.id);
      const bValue = b.get(column.id);

      const ret = columnSchema.comparator(
        aValue,
        bValue,
        column.direction,
        renderContext
      );

      if (ret !== 0) {
        return ret;
      }
    }

    return 0;
  });
}

function DataTable({ columns, dataRows, renderContext, initialSort = [] }) {
  const columnsById = useMemo(() => {
    return columns.reduce((map, element) => {
      map.set(element.id, element);
      return map;
    }, new Map());
  }, [columns]);

  const [sortedData, setSortedData] = useState(
    doSort(dataRows, columnsById, initialSort, renderContext)
  );

  const [sortingColumns, setSortingColumns] = useState(initialSort);

  const setSorting = (newSortingColumns) => {
    const newSortedData = doSort(
      sortedData,
      columnsById,
      newSortingColumns,
      renderContext
    );

    setSortedData(newSortedData);
    setSortingColumns(newSortingColumns);
  };

  const [visibleColumns, setVisibleColumns] = useState(() => {
    return columns
      .filter((column) => _.get(column, "defaultDisplay", true))
      .map(({ id }) => id);
  });

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId, isDetails }) => {
      if (sortedData[rowIndex].has(columnId)) {
        const cellValue = sortedData[rowIndex].get(columnId);
        const hasSchema = columnsById.get(columnId).hasOwnProperty("schema");
        const schemaHasRenderer = hasSchema
          ? schemaDetectorsByType
              .get(columnsById.get(columnId).schema)
              .hasOwnProperty("renderer")
          : false;
        const schemaHasDetailsRenderer = hasSchema
          ? schemaDetectorsByType
              .get(columnsById.get(columnId).schema)
              .hasOwnProperty("detailsRenderer")
          : false;

        if (isDetails && hasSchema && schemaHasDetailsRenderer) {
          return schemaDetectorsByType
            .get(columnsById.get(columnId).schema)
            .detailsRenderer(cellValue, renderContext);
        } else if (hasSchema && schemaHasRenderer) {
          return schemaDetectorsByType
            .get(columnsById.get(columnId).schema)
            .renderer(cellValue, renderContext);
        } else {
          return cellValue;
        }
      } else {
        return null;
      }
    };
  }, [sortedData, columnsById, renderContext]);

  return (
    <EuiDataGrid
      height={"100%"}
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={dataRows.length}
      renderCellValue={renderCellValue}
      sorting={{ columns: sortingColumns, onSort: setSorting }}
      schemaDetectors={Array.from(schemaDetectorsByType.values())}
    />
  );
}

export default DataTable;
