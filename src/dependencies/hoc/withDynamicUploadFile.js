import React from 'react'

const withDynamicUploadFile = Component => {

  const Internal = ({dataSource, context, backend, ...props}) => {

    return <Component {...props} backend={backend} ressource_id={context} />
  }

  return Internal
}

export default withDynamicUploadFile
