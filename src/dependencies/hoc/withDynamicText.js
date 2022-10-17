import React from 'react'
import lodash from 'lodash'

const withDynamicText = Component => {
  const internal = props => {
    const value = lodash.get(props.dataSource, props.attribute)
    return <Component {...lodash.omit(props, ['children'])}>{value}</Component>
  }

  return internal
}

export default withDynamicText
