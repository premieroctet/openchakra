import React from 'react'
import lodash from 'lodash'

const withDynamicValue = Component => {
  const internal = props => {
    const value = lodash.get(props.dataSource, props.attribute)
    return <Component {...lodash.omit(props, ['children'])} value={value} />
  }

  return internal
}

export default withDynamicValue
