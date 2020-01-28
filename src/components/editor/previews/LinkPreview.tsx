import React from "react";
import { Link, LinkProps } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const LinkPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props }: { props: LinkProps } = useInteractive(component);

  return <Link {...props}>{component.props.children || "Link"}</Link>;
};

export default LinkPreview;
