import React from 'react'
import lodash from 'lodash'

const withDynamicDate = Component => {
  const internal = props => {
    const value = lodash.get(props.dataSource, props.attribute)
    const spreaded = {...lodash.omit(props, ['children']), 'data-value': value}

    return <Component {...spreaded} />
  }

  return internal
}

export default withDynamicDate
