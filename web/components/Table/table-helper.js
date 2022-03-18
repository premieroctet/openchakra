import matchSorter from 'match-sorter'

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
}

export {fuzzyTextFilterFn}
