import React from "react";
import { Divider } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const DividerPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props }: { props: any } = useInteractive(component);
  return <Divider {...props} />;
};

export default DividerPreview;
