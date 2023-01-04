import React from 'react'
import lodash from 'lodash'

const withDynamicImage = Component => {

  const internal = (props) => {
    let src=lodash.get(props.dataSource, props.attribute)
    if (!src) {
      src=props.src
    }
    return (
      <Component {...lodash.omit(props, ['children'])} src={src} />
    )
  }

  return internal
}

export default withDynamicImage
