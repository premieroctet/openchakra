import React from 'react'
import lodash from 'lodash'


const setRecurseDataSource = (element, dataSource) => {
  if (React.Children.count(element.props.children) === 0) {
    return []
  } else {
    return React.Children.map(element.props.children, function(child) {
      if (child.props === undefined) {
        return child
      } else if (React.Children.count(child.props.children) === 0) {
        return React.cloneElement(child, {dataSource})
      } else {
        return React.cloneElement(child, {dataSource}, setRecurseDataSource(child))
      }
    })
  }
}
const withDynamicContainer = Component => {

  const internal = (props) => {
    if (!props.dataSource) {
      return null
    }
    const firstChild=React.Children.toArray(props.children)[0]
    return (
      <Component {...lodash.omit(props, ['children'])}>
    {props.dataSource.map(d => (
        <>{React.cloneElement(firstChild, {dataSource: d}, setRecurseDataSource(firstChild, d))}</>
      ))}
      </Component>
    )
  }

  return internal
}

export default withDynamicContainer
