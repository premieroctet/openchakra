import React, { memo } from 'react'
import DragItem from './DragItem'
import { useSelector } from 'react-redux'
import {
  getProxyComponent,
  getUserComponentsIds,
} from '../../core/selectors/components'

interface IItemProps {
  userComponentId: string
  onDelete: (id: string) => void
}

const Item = ({ userComponentId, onDelete }: IItemProps) => {
  let component = useSelector(getProxyComponent(userComponentId))

  return component ? (
    <DragItem
      key={`user-components-${component.userComponentName}`}
      label={component.userComponentName || 'custom'}
      type={component.type}
      id={component.id}
      userComponentId={component.id}
      isDeletable
      onDelete={() => onDelete(userComponentId)}
      userComponentName={component.userComponentName}
    >
      {component.userComponentName}
    </DragItem>
  ) : null
}

interface IUserComponentsMenuProps {
  onDelete: (id: string) => void
}

const UserComponentsMenu = ({ onDelete }: IUserComponentsMenuProps) => {
  const userComponentIds = useSelector(getUserComponentsIds)

  return (
    <>
      {userComponentIds.map(id => (
        <Item key={id} userComponentId={id} onDelete={onDelete} />
      ))}
    </>
  )
}

export default memo(UserComponentsMenu)
