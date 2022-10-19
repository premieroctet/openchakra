import React from 'react'
// import get from 'lodash/get'

const withDynamicUploadFile = Component => {

  const Internal = ({dataSource, context, backend, ...props}) => {
    // const value = get(dataSource, props.attribute)
    return <Component {...props} backend={backend} ressource_id={context} />
  }

  return Internal
}

export default withDynamicUploadFile
