import React, {useState, useEffect} from 'react'
import lodash from 'lodash'
import { getConditionalProperties } from '../utils/filters'
import moment from 'moment'

const withWappizy = Component => {

  const internal = ({children, ...props}) => {
    const conditionalProperties = getConditionalProperties(props,props.dataSource)

    const [defaultIndex, setDefaultIndex]=useState(undefined)
    const [key, setKey]=useState(props.key)

    if (props.scrollToday) {
      useEffect(() => {
        if (!!props.dataSource) {
          const data=lodash.get(props.dataSource, props.attribute)
          const index=data.findIndex(obj => moment(obj.day).isSame(moment(), 'day'))
          setDefaultIndex(index)
        }
      }, [props.dataSource])
      useEffect(()=> {
        setKey(moment())
      }, [defaultIndex])
      useEffect(()=> {
        setTimeout(() => {
          const childs=React.Children.toArray(children)
          const tabList=document.getElementById(childs[0].props.id)
          console.log('tabList', tabList, tabList.scrollWidth)
          tabList.scrollLeft=tabList.scrollWidth
          }, 300);
      }, [children])
    }

    const all_props={...props, ...conditionalProperties, defaultIndex, key}

    return (
      <Component {...all_props}>
       {children}
      </Component>
    )
  }

  return internal
}

export default withWappizy
