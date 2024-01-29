import React, {useState} from 'react'
import lodash from 'lodash'
import {ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { matcher } from '../utils/misc';
import {Flex} from '@chakra-ui/react'
import { DEFAULT_LIMIT } from '../utils/consts';

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
      // DANGEROUS!!!!!!!! FOR QUIZZ !!!!!
      const newSuffix = suffix//child?.props?.dataSourceId ? `${suffix}_${index}` : suffix
      const newId = child.props?.id ? `${child.props?.id}${suffix}` : undefined
      const key = `${dataSource?._id}_${index}`
      const level=newId ? newId.split(/(_.*)$/)[1] : undefined
      //if (child.props === undefined || (child.props.dataSourceId && child.props.dataSourceId!=dataSourceId)) {
        if (child.props === undefined) {
          return child
        } else if (React.Children.count(child.props.children) === 0) {
        if (isOtherSource(child, dataSourceId)) {
          return React.cloneElement(child, { id: newId, level, key})
        }
        return React.cloneElement(child, {id: newId, level, dataSource, key})
      } else {
        if (isOtherSource(child, dataSourceId)) {
          return React.cloneElement(
            child,
            { id: newId, level, key },
            setRecurseDataSource(child, dataSource, dataSourceId, newSuffix),
          )
        }
        return React.cloneElement(
          child,
          { id: newId, level, dataSource, key },
          setRecurseDataSource(child, dataSource, dataSourceId, newSuffix),
        )
      }
    })
  }
}
const withDynamicContainer = Component => {
  // TODO vomi
  const FILTER_ATTRIBUTES = ['code', 'name', 'short_name', 'description', 'title']

  const internal = ({hiddenRoles, user, shuffle, limit, hidePagination, ...props}) => {

    limit = limit || DEFAULT_LIMIT

    const getPageIndexKey= () => {
      return `${props.dataSourceId}${props.fullPath ? '.'+props.fullPath : ''}`
    }

    /** withMaskability */
    // TODO: in code.ts, generate withMaskability(withDynamic()) ...
    if (hiddenRoles) {
      const rolesToHide = JSON.parse(hiddenRoles)
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


    const _hasNext = orgData.length>limit

    if (shuffle) {
      orgData=lodash.shuffle(orgData)
    }

    const original_length=orgData.length

    if (limit) {
      try {
        // console.log('Limiting', JSON.stringify(orgData, null, 2))
        orgData = orgData.slice(0, limit)
        console.log('Limited', JSON.stringify(orgData, null, 2))
      }
      catch (err) {
        console.error(`Container ${props.id} can not slice ${JSON.stringify(orgData)}:${err}`)
      }
      }
  
    if (props.filterAttribute && props.filterConstant) {
      const value=props.filterConstant
      // TODO Check why value "null" comes as string
      if (!(lodash.isNil(value) || value=="null")) {
        orgData = matcher(value, orgData, props.filterAttribute)
      }
    }

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
        orgData = matcher(value, orgData, props.filterAttribute)
      }
    }
    if (props.filterAttribute2 && props.filterValue2) {
      const value=props.getComponentValue(props.filterValue2, props.level)
      // TODO Check why value "null" comes as string
      if (!(lodash.isNil(value) || value=="null")) {
        orgData = matcher(value, orgData, props.filterAttribute2)
      }
    }

    if (props.sortAttribute) {
      const direction=props.sortDirection || 'asc'
      orgData = lodash.orderBy(orgData, props.sortAttribute, direction)
    }

    const [firstChild, secondChild] = React.Children.toArray(props.children).slice(0,2)

    if (lodash.isEmpty(orgData)) {
      return (
        <Component {...lodash.omit(props, ['children'])}>
        {secondChild || null}
        </Component>
      )
    }

    const getPageIndex = () => {
      const res=props.pagesIndex[getPageIndexKey()] || 0
      // console.log('page index', res)
      return res
    }


    const hasPrev = () => getPageIndex()>0
    const hasNext = () => _hasNext

    const prev= () => {
      if (!hasPrev()) {return}
      const allIndexes={...props.pagesIndex}
      const currentIndex=props.pagesIndex[getPageIndexKey()] || 0
      allIndexes[getPageIndexKey()]=currentIndex-1
      props.setPagesIndex(allIndexes)
    }

    const next= () => {
      if (!hasNext()) {return}
      const allIndexes={...props.pagesIndex}
      const currentIndex=props.pagesIndex[getPageIndexKey()] || 0
      allIndexes[getPageIndexKey()]=currentIndex+1
      props.setPagesIndex(allIndexes)
    }

    // console.log('(original_length>limit || getPageIndex()>0) && !hidePagination ?', original_length, limit, getPageIndex(), hidePagination)
    const navigation=(original_length>limit || getPageIndex()>0) && !hidePagination ?
      <Flex justifyContent={'space-around'} style={{width: '100%'}} flex={'row'}>
        <ArrowLeftIcon style={{opacity: !hasPrev() && '50%'}} enabled={false} onClick={prev} />
        <Flex>{getPageIndex()*limit+1}-{getPageIndex()*limit+Math.min(limit, orgData.length)}</Flex>
        <ArrowRightIcon style={{opacity: !hasNext() && '50%'}} onClick={next} />
      </Flex>
      :
      null
    return (
      <Component {...lodash.omit(props, ['children'])}>
        {navigation}
        {orgData.map((d, index) => {
          const newId = firstChild.props?.id
            ? `${firstChild.props?.id}_${index}`
            : undefined
          return (
            <>
              {React.cloneElement(
                firstChild,
                { id: newId, level: index, dataSource: d, _id: d?._id },
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
        {navigation}
      </Component>
    )
  }

  return internal
}

export default withDynamicContainer
