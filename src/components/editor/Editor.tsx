import React, { memo } from "react";
import { Box, Text, Link } from "@chakra-ui/core";
import { useBuilderContext } from "../../contexts/BuilderContext";
import ComponentPreview from "./ComponentPreview";
import { useDropComponent } from "../../hooks/useDropComponent";
import SplitPane from "react-split-pane";
import CodePanel from "../CodePanel";

const Editor: React.FC = () => {
  const { components, showCode } = useBuilderContext();
  const { drop } = useDropComponent("root");

  const isEmpty = !components.root.children.length;

  const Playground = (
    <Box
      height="100%"
      width="100%"
      backgroundImage="linear-gradient(to right, #d9e2e9 1px, transparent 1px),linear-gradient(to bottom, #d9e2e9 1px, transparent 1px);"
      backgroundSize="20px 20px"
      bg="#edf2f6"
      p={10}
      display={isEmpty ? "flex" : "block"}
      justifyContent="center"
      alignItems="center"
      ref={drop}
      flexDirection="column"
    >
      {isEmpty && (
        <Text maxWidth="md" color="gray.400" fontSize="xl" textAlign="center">
          Drag some component to start coding without code! Or load a{" "}
          <Link textDecoration="underline">sample component</Link>.
        </Text>
      )}

      {components.root.children.map((key: string) => (
        <ComponentPreview component={components[key]} />
      ))}
    </Box>
  );

  if (!showCode) {
    return Playground;
  }

  return (
    <SplitPane
      defaultSize="50%"
      resizerStyle={{
        border: "3px solid rgba(1, 22, 39, 0.21)",
        zIndex: 20,
        cursor: "row-resize"
      }}
      split="horizontal"
    >
      {Playground}
      <CodePanel />
    </SplitPane>
  );
};

export default memo(Editor);
