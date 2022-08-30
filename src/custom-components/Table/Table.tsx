import React from 'react'

const Table = dataSource => (
  <ul>
    {dataSource.map(data => {
      <li>{JSON.stringify(data)}</li>
    })}
  </ul>
)

export default Table
