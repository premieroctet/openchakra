import React, {useState, useMemo} from 'react'
import regeneratorRuntime from 'regenerator-runtime' // Needed for react-table
import {useTable, useSortBy, useFilters, useGlobalFilter} from 'react-table'
import GlobalFilter from './TableFilter'
import {fuzzyTextFilterFn} from './table-helper'


function DefaultColumnFilter({
  column: {filterValue, preFilteredRows, setFilter},
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}


const Table = ({data, columns}) => {

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    [],
  )

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  )


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      visibleColumns: [],
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
  )
    

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10)


  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <button {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : 'trier'}
                  </button>
                  {/* Render the columns filter UI */}
                  <div>{console.log(column)}</div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  console.log(cell)
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table
