import React from 'react'

const withDynamicUploadFile = Component => {

  const Internal = ({dataSource, context = null, backend, attribute, ...props}) => {
    // const value = get(dataSource, props.attribute)
    return <Component {...props} backend={backend} attribute={attribute} ressource_id={context} />
  }

  return Internal
}

export default withDynamicUploadFile
