import React from 'react'
import lodash from 'lodash'

const withDynamicText = Component => {

  const internal = (props) => {
    return (
      <Component {...lodash.omit(props, ['children'])}>
        <span {...props}>{lodash.get(props.dataSource, props.attribute)}</span>
      </Component>
    )
  }

  return internal
}

export default withDynamicText
