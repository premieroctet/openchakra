import React from 'react'
import lodash from 'lodash'

const withDynamicImage = Component => {

  const internal = (props) => {
    const src=props.dataSource?.[props.attribute]
    if (!src) {
      return null
    }
    const url = src.startsWith('http') ? src : `https://my-alfred.io:4002/${src}`
    return (
      <Component {...lodash.omit(props, ['children'])} src={url} />
    )
  }

  return internal
}

export default withDynamicImage
