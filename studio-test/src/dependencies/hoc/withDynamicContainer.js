import React from 'react'
import lodash from 'lodash'
import {getComponentDataValue} from '../utils/values'

const normalize = str => {
  str = str
    ? str
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    : ''
  return str
}

const isOtherSource = (element, dataSourceId) => {
  if (
    element.props.dynamicContainer &&
    element.props.dataSourceId &&
    element.props.dataSourceId !== dataSourceId
  ) {
    return true
  }
}
const setRecurseDataSource = (
  element,
  dataSource,
  dataSourceId,
  suffix = '',
) => {
  if (React.Children.count(element.props.children) === 0) {
    return []
  } else {
    return React.Children.map(element.props.children, function(child, index) {
      const newSuffix = `${suffix}_${index}`
      const newId = child.props?.id ? `${child.props?.id}${suffix}` : undefined
      //if (child.props === undefined || (child.props.dataSourceId && child.props.dataSourceId!=dataSourceId)) {
      if (child.props === undefined) {
        return child
      } else if (React.Children.count(child.props.children) === 0) {
        if (isOtherSource(child, dataSourceId)) {
          return React.cloneElement(child, { id: newId, index: suffix })
        }
        return React.cloneElement(child, {
          id: newId,
          index: suffix,
          dataSource,
        })
      } else {
        if (isOtherSource(child, dataSourceId)) {
          return React.cloneElement(
            child,
            { id: newId, index: suffix },
            setRecurseDataSource(child, dataSource, dataSourceId, newSuffix),
          )
        }
        return React.cloneElement(
          child,
          { id: newId, index: suffix, dataSource },
          setRecurseDataSource(child, dataSource, dataSourceId, newSuffix),
        )
      }
    })
  }
}
const withDynamicContainer = Component => {
  const FILTER_ATTRIBUTES = ['code', 'name', 'short_name', 'description', 'title']

  const internal = props => {

    if (!props.dataSource) {
      return null
    }
    let orgData = props.dataSource
    if (props.attribute) {
      orgData = lodash.get(orgData, props.attribute)
    }
    orgData = orgData
    if (props.contextFilter) {
      const contextIds = props.contextFilter.map(o => o._id.toString())
      orgData = orgData.filter(d => contextIds.includes(d._id))
    }
    if (props.textFilter) {
      const filterValue = props.textFilter
      const regExp = new RegExp(normalize(filterValue).trim(), 'i')
      orgData = orgData.filter(d =>
        FILTER_ATTRIBUTES.some(att => regExp.test(normalize(d[att]))),
      )
    }
    if (props.filterAttribute && props.filterValue) {
      const value=props.filterValue //getComponentDataValue(props.filterValue, props.index)
      const regExp = new RegExp(normalize(value).trim(), 'i')
      const attribute=props.filterAttribute
      orgData = orgData.filter(d =>regExp.test(normalize(d[attribute])))
    }
    let data = []
    try {
      data = orgData.slice(0, parseInt(props?.limit) || undefined)
    } catch (err) {
      console.error(
        `Container ${props.id} can not slice ${JSON.stringify(orgData)}:${err}`,
      )
    }

    const firstChild = React.Children.toArray(props.children)[0]

    return (
      <Component {...lodash.omit(props, ['children'])}>
        {data.map((d, index) => {
          const newId = firstChild.props?.id
            ? `${firstChild.props?.id}_${index}`
            : undefined
          return (
            <>
              {React.cloneElement(
                firstChild,
                { id: newId, index, dataSource: d },
                setRecurseDataSource(
                  firstChild,
                  d,
                  props.dataSourceId,
                  `_${index}`,
                ),
              )}
            </>
          )
        })}
      </Component>
    )
  }

  return internal
}

export default withDynamicContainer
