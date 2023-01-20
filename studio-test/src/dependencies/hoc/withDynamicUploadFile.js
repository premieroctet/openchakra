import React from 'react'
import lodash from 'lodash'

const withDynamicUploadFile = Component => {

  const Internal = (props, dataSource, attribute) => {
    const value = lodash.get(dataSource, props.attribute)
    const pr={...props, value}
    return <Component {...pr}/>
  }

  return Internal
}

export default withDynamicUploadFile
