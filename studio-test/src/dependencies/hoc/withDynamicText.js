import React from 'react'
import lodash from 'lodash'
import { getConditionalProperties } from '../utils/filters'

const withDynamicText = Component => {
  const internal = props => {
    const value = lodash.get(props.dataSource, props.attribute)
    const conditionalProperties = getConditionalProperties(
      props,
      props.dataSource,
    )
    return (
      <Component
        {...lodash.omit(props, ['children'])}
        {...conditionalProperties}
      >
        {value}
      </Component>
    )
  }

  return internal
}

export default withDynamicText
