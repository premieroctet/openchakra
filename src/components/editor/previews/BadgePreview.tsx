import React from "react";
import { Badge, BadgeProps } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const BadgePreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props }: { props: BadgeProps } = useInteractive(component);

  return <Badge {...props}>{component.props.children || "Lorem Ipsum"}</Badge>;
};

export default BadgePreview;
