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
        return React.cloneElement(child, {dataSource}, setRecurseDataSource(child, dataSource))
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
    const data=props.dataSource.slice(0, parseInt(props?.limit) || undefined)
    return (
      <Component {...lodash.omit(props, ['children'])}>
    {data.map(d => (
        <>{React.cloneElement(firstChild, {dataSource: d}, setRecurseDataSource(firstChild, d))}</>
      ))}
      </Component>
    )
  }

  return internal
}

export default withDynamicContainer
