import { useDrop, DropTargetMonitor } from "react-dnd";
import { rootComponents } from "../App";
import useDispatch from "./useDispatch";

export const useDropComponent = (
  componentId: string,
  accept: ComponentType[] = rootComponents
) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept,
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true })
    }),
    drop: (item: ComponentItemProps, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return;
      }

      if (item.isMoved) {
        dispatch.components.moveComponent({
          parentId: componentId,
          componentId: item.id
        });
      } else {
        dispatch.components.addComponent({
          parentName: componentId,
          type: item.type
        });
      }
    }
  });

  return { drop, isOver };
};
