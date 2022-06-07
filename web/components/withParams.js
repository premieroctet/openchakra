import queryString from 'query-string'
import React, {useEffect, useState} from 'react'

const withParams = WrappedComponent => props => {

  const [params, setParams]=useState({})

  useEffect(() => {
    const params=queryString.parse(window?.location.search)
    setParams(params)
  }, [])


  return <WrappedComponent key={JSON.stringify(params)} {...props} params={params} />
}

module.exports=withParams
