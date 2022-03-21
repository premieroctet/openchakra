import React, {useState} from 'react'
import {useAsyncDebounce} from 'react-table'

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)
  
  return (
    <span>
        Rechercher:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} lignes...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}


function DateRangeColumnFilter({
  column: {
    filterValue = [],
    preFilteredRows,
    setFilter,
    id,
  }}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0)
    let max = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0)

    preFilteredRows.forEach(row => {
      const rowDate = new Date(row.values[id])

      min = rowDate <= min ? rowDate : min
      max = rowDate >= max ? rowDate : max
    })

    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div>
      <input
        min={min.toISOString().slice(0, 10)}
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? val : undefined, old[1]])
        }}
        type="date"
        value={filterValue[0] || ''}
      />
      {' to '}
      <input
        max={max.toISOString().slice(0, 10)}
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? val.concat('T23:59:59.999Z') : undefined])
        }}
        type="date"
        value={filterValue[1]?.slice(0, 10) || ''}
      />
    </div>
  )
}

export {GlobalFilter, DateRangeColumnFilter}
