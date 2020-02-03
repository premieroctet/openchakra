import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  AvatarBadge,
  BoxProps
} from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";
import { useDropComponent } from "../../../hooks/useDropComponent";
import ComponentPreview from "../ComponentPreview";
import { RootState } from "../../..";
import { useSelector } from "react-redux";

const AvatarPreview: React.FC<IPreviewProps & {
  spacing?: BoxProps["marginLeft"];
  index?: number;
}> = ({ component, spacing, index }) => {
  const { drop, isOver } = useDropComponent(component.id, ["AvatarBadge"]);
  const { props, ref } = useInteractive(component);

  let boxProps: any = {
    display: "inline-block",
    zIndex: index ? 20 - index : null
  };

  props.p = 0;

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Avatar ml={index === 0 ? 0 : spacing} {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview componentName={key} />
        ))}
      </Avatar>
    </Box>
  );
};

export const AvatarGroupPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, ["Avatar"]);
  const components = useSelector((state: RootState) => state.components.present.components);
  let boxProps: any = { display: "inline" };

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <AvatarGroup {...props}>
        {component.children.map((key: string, i: number) => (
          <AvatarPreview
            index={i + 1}
            spacing={props.spacing}
            component={components[key]}
          />
        ))}
      </AvatarGroup>
    </Box>
  );
};

export const AvatarBadgePreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);

  return <AvatarBadge ref={ref} size="1.25em" bg="green.500" {...props} />;
};

export default AvatarPreview;
