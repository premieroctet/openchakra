import React from 'react'
import lodash from 'lodash'

const withDynamicText = Component => {
  const internal = props => {
    const value = lodash.get(props.dataSource, props.attribute)
    return (
      <Component {...lodash.omit(props, ['children'])}>
        <span {...props}>{value}</span>
      </Component>
    )
  }

  return internal
}

export default withDynamicText
