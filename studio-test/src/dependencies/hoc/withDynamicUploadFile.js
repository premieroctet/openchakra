import React from 'react'
// import get from 'lodash/get'

const withDynamicUploadFile = Component => {

  const Internal = (props) => {
    // const value = get(dataSource, props.attribute)
    return <Component {...props}/>
  }

  return Internal
}

export default withDynamicUploadFile
