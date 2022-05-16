import React, {useMemo} from 'react'
import {useTable, useSortBy, useFilters, useGlobalFilter} from 'react-table'
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
      placeholder={`Rechercher dans les ${count} lignes`}
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


const Table = (
  {
    data,
    columns,
    caption = null,
    footer = null,
    updateMyData = null,
    globalfilter=null,
    filtered=false,
  },
) => {

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

  const cols=useMemo(() => columns.map(c => ({...c, Header: c.label, accessor: c.attribute})), [columns])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns: cols,
      data,
      defaultColumn,
      filterTypes,
      visibleColumns: [],
      updateMyData,
    },
    filtered && useFilters,
    useGlobalFilter,
    useSortBy,
  )

  return (
    <div>
      {globalfilter ?
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        : null
      }
      <table {...getTableProps()}>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header') !== '' &&
                    <div className='header'>
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
                           Supprimer ce filtre
                        </button>
                        </div>}
                    </div>
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
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        {footer ?
          <tfoot>
            {footerGroups.map(group => (
              <tr {...group.getFooterGroupProps()}>
                {group.headers.map(column => (
                  <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                ))}
              </tr>
            ))}
          </tfoot>
          : null}
      </table>
    </div>
  )
}

export default Table
