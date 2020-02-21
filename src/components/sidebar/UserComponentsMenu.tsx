import React, { memo } from 'react'
import DragItem from './DragItem'
import { useSelector } from 'react-redux'
import { getProxyComponent } from '../../core/selectors/components'
import { RootState } from '../../core/store'

const Item: React.FC<{ userComponentId: string }> = ({ userComponentId }) => {
  let component = useSelector(getProxyComponent(userComponentId))

  return component ? (
    <DragItem
      key={`user-components-${component.userComponentName}`}
      label={component.userComponentName || 'custom'}
      type={component.type}
      id={component.id}
      userComponentId={component.id}
    >
      {component.userComponentName}
    </DragItem>
  ) : null
}

const UserComponentsMenu = () => {
  const userComponentIds = useSelector(
    (state: RootState) => state.components.present.userComponentIds,
  )

  return (
    <>
      {userComponentIds.map(id => (
        <Item userComponentId={id} />
      ))}
    </>
  )
}

export default memo(UserComponentsMenu)
