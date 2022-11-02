import React from 'react'
import lodash from 'lodash'

const withDynamicSource = Component => {
  const internal = props => {
    const value = lodash.get(props.dataSource, props.attribute)
    const spreaded = {...lodash.omit(props, ['children']), 'data-source': value}

    return <Component {...spreaded} />
  }

  return internal
}

export default withDynamicSource
