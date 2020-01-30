import { useRef, MouseEvent } from "react";
import { useBuilderContext } from "../contexts/BuilderContext";
import { useEditorContext } from "../contexts/EditorContext";

export const useInteractive = (
  component: IComponent,
  enableVisualHelper: boolean = true
) => {
  const { setOverlay } = useEditorContext();
  const { showLayout, setSelectedComponent } = useBuilderContext();

  const ref = useRef<HTMLDivElement>(null);
  let props = {
    ...component.props,
    onMouseOver: (event: MouseEvent) => {
      if (ref && ref.current) {
        event.stopPropagation();
        setOverlay({
          name: component.name,
          type: component.type,
          rect: ref.current.getBoundingClientRect()
        });
      }
    },
    onMouseOut: () => {
      setOverlay(undefined);
    },
    onClick: (event: MouseEvent) => {
      event.stopPropagation();
      setSelectedComponent(component.name);
    }
  };

  const dropTypes: ComponentType[] = ["Box", "AvatarGroup", "Avatar", "Alert"];

  if (showLayout && dropTypes.includes(component.type) && enableVisualHelper) {
    props = {
      ...props,
      border: `1px dashed #718096`,
      padding: props.p || props.padding ? props.p || props.padding : 4
    };
  }

  return { props, ref };
};
