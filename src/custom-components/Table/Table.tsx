import React from 'react'

const Table = ({ dataSource }) => {
  const cols = Object.keys(dataSource[0])
  return (
    <table border="1">
      <thead>
        <tr>
          {cols.map(c => (
            <th>{c}</th>
          ))}
        </tr>
      </thead>
      {dataSource.map(data => (
        <tr>
          {cols.map(key => (
            <td>{data[key]}</td>
          ))}
        </tr>
      ))}
    </table>
  )
}

export default Table
