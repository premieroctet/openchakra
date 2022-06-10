import React from 'react'
const {is_development} = require('../config/config')

const DevLog = ({children}) => {

  if (!is_development()) {
    return null
  }
  return (
    <>
      <h1>INFO DEVELOPPEMENT</h1>
      <>{children}</>
    </>
  )
}


export default DevLog
