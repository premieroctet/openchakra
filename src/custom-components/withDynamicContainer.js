import React from 'react'
import lodash from 'lodash'

const withDynamicContainer = Component => {

  const internal = (props) => {
    console.log(`dataSource:${props.dataSource?.length}`)
    if (!props.dataSource) {
      return null
    }
    return (
      <Component {...lodash.omit(props, ['children'])}>
    {props.dataSource.map(d => (
        <>{React.cloneElement(React.Children.toArray(props.children)[0], {dataSource: d})}</>
      ))}
      </Component>
    )
  }

  return internal
}

export default withDynamicContainer
