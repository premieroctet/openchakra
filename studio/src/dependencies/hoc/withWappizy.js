import React from 'react'
import lodash from 'lodash'
import { getConditionalProperties } from '../utils/filters'

const withWappizy = Component => {

  const internal = ({children, ...props}) => {
    const conditionalProperties = getConditionalProperties(props,props.dataSource)

    const all_props={...props, ...conditionalProperties}
    return (
      <Component {...all_props}>
       {children}
      </Component>
    )
  }

  return internal
}

export default withWappizy
