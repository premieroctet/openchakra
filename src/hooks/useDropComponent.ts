import { useDrop } from "react-dnd";
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
    drop: (item: ComponentItemProps, monitor) => {
      if (monitor.isOver()) {
        dispatch.app.addComponent({
          parentName: componentId,
          type: item.type
        });
      }
    }
  });

  return { drop, isOver };
};
