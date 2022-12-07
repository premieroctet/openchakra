import React from 'react'
import { useSelector } from 'react-redux'
import { getSelectedComponentParent } from '~core/selectors/components'
import ElementListItem from '~components/inspector/elements-list/ElementListItem'
import useDispatch from '~hooks/useDispatch'

const ParentInspector = () => {
  const parentComponent = useSelector(getSelectedComponentParent)
  const dispatch = useDispatch()

  const onSelect = () => {
    dispatch.project.select(parentComponent.id)
  }

  const onHover = () => {
    dispatch.project.hover(parentComponent.id)
  }

  const onUnhover = () => {
    dispatch.project.unhover()
  }

  return (
    <ElementListItem
      type={parentComponent.type}
      onMouseOver={onHover}
      onMouseOut={onUnhover}
      onSelect={onSelect}
    />
  )
}

export default ParentInspector
