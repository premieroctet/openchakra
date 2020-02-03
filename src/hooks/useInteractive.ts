import { useRef, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "..";
import useDispatch from "./useDispatch";
import { useDrag } from "react-dnd";

export const useInteractive = (
  component: IComponent,
  enableVisualHelper: boolean = false
) => {
  const dispatch = useDispatch();
  const showLayout = useSelector((state: RootState) => state.app.showLayout);
  const [, drag] = useDrag({
    item: { id: component.id, type: component.type, isMoved: true }
  });

  const ref = useRef<HTMLDivElement>(null);

  let props = {
    ...component.props,
    onMouseOver: (event: MouseEvent) => {
      if (ref && ref.current) {
        event.stopPropagation();
        dispatch.app.setOverlay({
          name: component.id,
          type: component.type,
          rect: ref.current.getBoundingClientRect()
        });
      }
    },
    onMouseOut: () => {
      dispatch.app.setOverlay(undefined);
    },
    onClick: (event: MouseEvent) => {
      event.stopPropagation();
      dispatch.app.setSelectedId(component.id);
    }
  };

  if (showLayout && enableVisualHelper) {
    props = {
      ...props,
      border: `1px dashed #718096`,
      padding: props.p || props.padding ? props.p || props.padding : 4
    };
  }

  return { props, ref: drag(ref), drag };
};
