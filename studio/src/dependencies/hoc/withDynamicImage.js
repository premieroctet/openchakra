import React from 'react'
import lodash from 'lodash'

const withDynamicImage = Component => {
  const internal = props => {
    const src = lodash.get(props.dataSource, props.attribute)
    const version = lodash.get(props.dataSource, 'version')
    if (!src) {
      return null
    }
    return (
      <Component
        {...lodash.omit(props, ['children'])}
        src={src}
        version={version}
      />
    )
  }

  return internal
}

export default withDynamicImage
