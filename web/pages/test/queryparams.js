import React from 'react'
import withParams from '../../components/withParams'

const QueryParamsTest = props => {

  return (
    <>
      <p>Params : {JSON.stringify(props.params)}</p>
    </>
  )
}

module.exports=withParams(QueryParamsTest)
