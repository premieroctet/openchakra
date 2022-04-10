import React, {useMemo} from 'react'
import {useTable, useSortBy, useFilters, useGlobalFilter} from 'react-table'
import lodash from 'lodash'
import {GlobalFilter} from './TableFilter'
import {fuzzyTextFilterFn} from './table-helper'
import TableDialogFilter from './TableDialogFilter'

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

function dateBetweenFilterFn(rows, id, filterValues) {
  const sd = filterValues[0] ? new Date(filterValues[0]) : undefined
  const ed = filterValues[1] ? new Date(filterValues[1]) : undefined

  if (ed || sd) {
    return rows.filter(r => {
      const cellDate = new Date(r.values[id])

      if (ed && sd) {
        return cellDate >= sd && cellDate <= ed
      }
      else if (sd) {
        return cellDate >= sd
      }
      else if (ed) {
        return cellDate <= ed
      }
    })
  }
  return rows

}

dateBetweenFilterFn.autoRemove = val => !val


const Table = ({data, columns, updateMyData = null}) => {

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      dateBetween: dateBetweenFilterFn,
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
      // default Filter UI
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
      defaultColumn,
      filterTypes,
      visibleColumns: [],
      updateMyData,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
  )

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps()}>

                  {column.render('Header') !== '' &&
                    <>
                      <button {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        {column.isSorted &&(
                          column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼')
                          }
                      </button>
                      {column.canFilter &&
                        <>
                          <TableDialogFilter>
                            {column.render('Filter')}
                          </TableDialogFilter>
                        </>
                        }

                      {column.filterValue &&
                        <div>{column.filterValue}  <button onClick={() => column.setFilter(undefined)}>
                           Reset
                        </button>
                        </div>}
                    </>
                    }
                </th>
              ))}
            </tr>
          ))}

        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  // console.log(cell)
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
