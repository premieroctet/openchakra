import React from 'react'
import lodash from 'lodash'

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
      const newSuffix = child?.props?.dataSourceId ? `${suffix}_${index}` : suffix
      const newId = child.props?.id ? `${child.props?.id}${suffix}` : undefined
      const level=newId ? newId.split(/(_.*)$/)[1] : undefined
      //if (child.props === undefined || (child.props.dataSourceId && child.props.dataSourceId!=dataSourceId)) {
      if (child.props === undefined) {
        return child
      } else if (React.Children.count(child.props.children) === 0) {
        if (isOtherSource(child, dataSourceId)) {
          return React.cloneElement(child, { id: newId, level})
        }
        return React.cloneElement(child, {id: newId, level, dataSource})
      } else {
        if (isOtherSource(child, dataSourceId)) {
          return React.cloneElement(
            child,
            { id: newId, level },
            setRecurseDataSource(child, dataSource, dataSourceId, newSuffix),
          )
        }
        return React.cloneElement(
          child,
          { id: newId, level, dataSource },
          setRecurseDataSource(child, dataSource, dataSourceId, newSuffix),
        )
      }
    })
  }
}
const withDynamicContainer = Component => {
  const FILTER_ATTRIBUTES = ['code', 'name', 'short_name', 'description', 'title']

  const internal = ({hiddenRoles, user, ...props}) => {

    /** withMaskability */
    // TODO: in code.ts, generate withMaskability(withDynamic()) ...
    if (hiddenRoles) {
      const rolesToHide = JSON.parse(hiddenRoles)
      console.log(`Roles to hide:${rolesToHide}`)
      const roleUser = user?.role

      // When roleUser is available, reveal
      if (roleUser && rolesToHide.includes(roleUser)) {
        return null
      }
    }
    /** withMaskability*/

    if (!props.dataSource) {
      return null
    }
    let orgData = props.dataSource
    if (props.attribute) {
      orgData = lodash.get(orgData, props.attribute)
    }

    if (!lodash.isArray(orgData)) {
      console.warn(`Container ${props.id}:expected array, got ${JSON.stringify(orgData)}`)
      return null
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
      const value=props.getComponentValue(props.filterValue, props.level)
      // TODO Check why value "null" comes as string
      if (!(lodash.isNil(value) || value=="null")) {
        const regExp = new RegExp(normalize(value).trim(), 'i')
        const attribute=props.filterAttribute
        orgData = orgData.filter(d =>regExp.test(normalize(d[attribute])))
      }
    }
    let data = orgData
    if (true || !lodash.isNil(props?.limit)) {
    try {
        data = orgData.slice(0, parseInt(props?.limit) || undefined)
      }
      catch (err) {
        console.error(`Container ${props.id} can not slice ${JSON.stringify(orgData)}:${err}`)
      }
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
                { id: newId, level: index, dataSource: d },
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
