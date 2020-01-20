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

export const AvatarPreview = ({
  component,
  spacing,
  isFirstElement
}: IPreviewProps & {
  spacing?: BoxProps["marginLeft"];
  isFirstElement?: boolean;
}) => {
  const { props } = useInteractive(component);
  const { drop, isOver } = useDropComponent(component.name);
  const { components } = useBuilderContext();

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop}>
      <Avatar ml={isFirstElement ? 0 : spacing} {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview component={components[key]} />
        ))}
      </Avatar>
    </Box>
  );
};

export const AvatarGroupPreview = ({ component }: IPreviewProps) => {
  const { drop, isOver } = useDropComponent(component.name);
  const { components } = useBuilderContext();
  const { props } = useInteractive(component);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop}>
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
  const { props } = useInteractive(component);

  return <AvatarBadge size="1.25em" bg="green.500" {...props} />;
};

export default AvatarPreview;
