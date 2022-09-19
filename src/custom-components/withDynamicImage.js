import React from 'react'
import lodash from 'lodash'

const withDynamicImage = Component => {

  const internal = (props) => {
    const src=`https://my-alfred.io:4002/${props.dataSource?.[props.attribute]}`
    return (
      <Component {...lodash.omit(props, ['children'])} src={src} />
    )
  }

  return internal
}

export default withDynamicImage
