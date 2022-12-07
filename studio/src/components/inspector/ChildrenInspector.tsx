import React from 'react'
import { useSelector } from 'react-redux'
import { getSelectedComponentChildren } from '~core/selectors/components'
import ElementsList from '~components/inspector/elements-list/ElementsList'
import useDispatch from '~hooks/useDispatch'

const ChildrenInspector = () => {
  const childrenComponent = useSelector(getSelectedComponentChildren)
  const dispatch = useDispatch()

  const moveChildren = (fromIndex: number, toIndex: number) => {
    dispatch.project.moveSelectedComponentChildren({
      fromIndex,
      toIndex,
    })
  }

  const onSelectChild = (id: IComponent['id']) => {
    dispatch.project.select(id)
  }

  const onHoverChild = (id: IComponent['id']) => {
    dispatch.project.hover(id)
  }

  const onUnhoverChild = () => {
    dispatch.project.unhover()
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
