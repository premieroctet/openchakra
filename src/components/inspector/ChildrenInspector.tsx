import React from 'react'
import { useSelector } from 'react-redux'
import { getSelectedComponentChildren } from '../../core/selectors/components'
import ChildrenList from './children/ChildrenList'
import useDispatch from '../../hooks/useDispatch'

const ChildrenInspector = () => {
  const childrenComponent = useSelector(getSelectedComponentChildren)
  const dispatch = useDispatch()

  const moveChildren = (fromIndex: number, toIndex: number) => {
    dispatch.components.moveSelectedComponentChildren({
      fromIndex,
      toIndex,
    })
  }

  const onSelectChild = (id: IComponent['id']) => {
    dispatch.components.select(id)
  }

  return (
    <ChildrenList
      childrenList={childrenComponent}
      moveItem={moveChildren}
      onSelect={onSelectChild}
    />
  )
}

export default ChildrenInspector
