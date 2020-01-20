import { useState } from "react";
import { useBuilderContext } from "../contexts/BuilderContext";
import { useColorMode } from "@chakra-ui/core";

export const useInteractive = (component: IComponent) => {
  const [isHover, setIsHover] = useState(false);
  const { colorMode } = useColorMode();

  const {
    selectedComponent,
    setSelectedComponent,
    showLayout
  } = useBuilderContext();

  let props = {
    ...component.props,
    onMouseOut: (e: MouseEvent) => {
      e.stopPropagation();
      setIsHover(false);
    },
    onMouseOver: (e: MouseEvent) => {
      e.stopPropagation();
      setIsHover(true);
    },
    onClick: (e: Event) => {
      e.stopPropagation();
      setSelectedComponent(component.name);
    }
  };

  const dropTypes: ComponentType[] = ["Box", "AvatarGroup", "Avatar"];

  if (showLayout && dropTypes.includes(component.type)) {
    props = {
      ...props,
      border: `1px dashed ${colorMode === "light" ? "grey" : "#718096"}`,
      padding: props.p || props.padding ? props.p || props.padding : 4
    };
  }

  if (isHover) {
    props = {
      ...props,
      border: `1px solid ${colorMode === "light" ? "grey" : "#718096"}`
    };
  }

  if (component.name === selectedComponent) {
    //props = { ...props, border: "1px solid #319795" };
  }

  return { props };
};
