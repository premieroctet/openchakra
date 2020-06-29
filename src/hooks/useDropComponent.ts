import { useDrop, DropTargetMonitor } from 'react-dnd'
import { rootComponents } from '../utils/editor'
import useDispatch from './useDispatch'
import builder from '../core/models/composer/builder'
import { useSelector } from 'react-redux'
import {
  getIsUserComponent,
  getIsPartOfUserComponent,
} from '../core/selectors/components'

export const useDropComponent = (
  componentId: string,
  accept: (ComponentType | MetaComponentType)[] = rootComponents,
  canDrop: boolean = true,
) => {
  const dispatch = useDispatch()
  const isUserComponent = useSelector(getIsUserComponent(componentId))
  const isPartOfUserComponent = useSelector(
    getIsPartOfUserComponent(componentId),
  )

  const [{ isOver }, drop] = useDrop({
    accept,
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
    drop: (item: ComponentItemProps, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return
      }

      if (item.isMoved) {
        dispatch.components.moveComponent({
          parentId: componentId,
          componentId: item.id,
        })
      } else if (item.isMeta) {
        dispatch.components.addMetaComponent(builder[item.type](componentId))
      } else if (item.userComponentId) {
        dispatch.components.addUserComponent({
          type: item.type,
          parentName: componentId,
          instanceOf: item.userComponentId,
          userComponentName: item.userComponentName,
        })
      } else {
        dispatch.components.addComponent({
          parentName: componentId,
          type: item.type,
          rootParentType: item.rootParentType,
        })
      }
    },
    canDrop: (item: ComponentItemProps) => {
      if (isPartOfUserComponent) {
        return canDrop && !isPartOfUserComponent
      }
      if (isUserComponent) {
        return canDrop && !item.userComponentId
      }

      return canDrop
    },
  })

  return { drop, isOver }
}
