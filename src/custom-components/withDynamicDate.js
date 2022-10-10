import React from 'react'
import lodash from 'lodash'

const withDynamicDate = Component => {
  const internal = props => {
    const value = lodash.get(props.dataSource, props.attribute)
    const date = new Date(value).toLocaleDateString()
    return <Component {...lodash.omit(props, ['children'])}>{date}</Component>
  }

  return internal
}

export default withDynamicDate
