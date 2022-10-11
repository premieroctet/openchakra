import React from 'react'
import lodash from 'lodash'

const setRecurseDataSource = (element, dataSource, dataSourceId) => {
  if (React.Children.count(element.props.children) === 0) {
    return []
  } else {
    return React.Children.map(element.props.children, function(child) {
      //if (child.props === undefined || (child.props.dataSourceId && child.props.dataSourceId!=dataSourceId)) {
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
    let orgData=props.dataSource
    if (props.attribute) {
      orgData=lodash.get(orgData, props.attribute)
    }
    orgData=orgData || []
    let data=[]
    try {
      data=orgData.slice(0, parseInt(props?.limit) || undefined)
    }
    catch(err) {
      console.error(`Can not slice ${JSON.stringify(orgData)}:${err}`)
    }
    return (
      <Component {...lodash.omit(props, ['children'])}>
    {data.map(d => (
        <>{React.cloneElement(firstChild, {dataSource: d}, setRecurseDataSource(firstChild, d, props.dataSourceId))}</>
      ))}
      </Component>
    )
  }

  return internal
}

export default withDynamicContainer
