import { useDrop, DropTargetMonitor } from 'react-dnd'
import { rootComponents } from '../utils/editor'
import useDispatch from './useDispatch'
import builder from '../core/models/composer/builder'
import { useSelector } from 'react-redux'
import {
  getIsUserComponent,
  getIsPartOfUserComponent,
  getProxyComponent,
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
  const component = useSelector(getProxyComponent(componentId))
  const trueComponentId = component.instanceOf || component.id

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
          parentId: trueComponentId,
          componentId: item.id,
        })
      } else if (item.isMeta) {
        dispatch.components.addMetaComponent(
          builder[item.type](trueComponentId),
        )
      } else if (item.userComponentId) {
        dispatch.components.addUserComponent({
          type: item.type,
          parentName: trueComponentId,
          instanceOf: item.userComponentId,
          userComponentName: item.userComponentName,
        })
      } else {
        dispatch.components.addComponent({
          parentName: trueComponentId,
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
        return canDrop && item.userComponentId !== trueComponentId
      }

      return canDrop
    },
  })

  return { drop, isOver }
}
