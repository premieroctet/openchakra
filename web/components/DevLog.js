import React from 'react'
import {is_development} from '../config/config'

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
