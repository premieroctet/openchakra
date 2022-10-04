import React from 'react'

const withDynamicButton = Component => {
  const internal = props => {
    const value = props.dataSource
    const pageUrl = props.pageName
    let onClick = props.onClick
    console.log(`onClick:${JSON.stringify(onClick)}`)
    if (value?._id && pageUrl) {
      onClick = () =>
        window.open(`/${pageUrl}?id=${value._id.toString()}`, '_blank')
    }
    console.log(`onClick:${onClick}`)
    return <Component {...props} onClick={onClick}></Component>
  }

  return internal
}

export default withDynamicButton
