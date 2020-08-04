import React from 'react'
import { useSelector } from 'react-redux'
import { getSelectedComponentChildren } from '~core/selectors/components'
import ElementsList from '~components/inspector/elements-list/ElementsList'
import useDispatch from '~hooks/useDispatch'

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

  const onHoverChild = (id: IComponent['id']) => {
    dispatch.components.hover(id)
  }

  const onUnhoverChild = () => {
    dispatch.components.unhover()
  }

  return (
    <ElementsList
      elements={childrenComponent}
      moveItem={moveChildren}
      onSelect={onSelectChild}
      onHover={onHoverChild}
      onUnhover={onUnhoverChild}
    />
  )
}

export default ChildrenInspector
