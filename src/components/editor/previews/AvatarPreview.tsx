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
import { useBuilderContext } from "../../../contexts/BuilderContext";

const AvatarPreview: React.FC<IPreviewProps & {
  spacing?: BoxProps["marginLeft"];
  isFirstElement?: boolean;
}> = ({ component, spacing, isFirstElement }) => {
  const { drop, isOver } = useDropComponent(component.name, ["AvatarBadge"]);
  const { props, ref } = useInteractive(component);
  const { components } = useBuilderContext();
  let boxProps: any = { display: "inline" };

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Avatar ml={isFirstElement ? 0 : spacing} {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview component={components[key]} />
        ))}
      </Avatar>
    </Box>
  );
};

export const AvatarGroupPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  const { drop, isOver } = useDropComponent(component.name, ["Avatar"]);
  const { components } = useBuilderContext();
  let boxProps: any = { display: "inline" };

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <AvatarGroup size="md" max={3} {...props}>
        {component.children.map((key: string, i: number) => (
          <AvatarPreview
            isFirstElement={i === 0}
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
