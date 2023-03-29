import React from 'react'
import lodash from 'lodash'
import { getConditionalProperties } from '../utils/filters'

const withDynamicText = Component => {
  const internal = props => {
    const enums=props.enum ?  JSON.parse(props.enum) : null
    let value = lodash.get(props.dataSource, props.attribute)
    if (enums && value in enums) {
      value=enums[value]
    }
    const conditionalProperties = getConditionalProperties(
      props,
      props.dataSource,
    )
    return (
      <Component
        {...lodash.omit(props, ['children'])}
        {...conditionalProperties}
        data-value={value}
        value={value}
      >
        {value}
      </Component>
    )
  }

  return internal
}

export default withDynamicText
