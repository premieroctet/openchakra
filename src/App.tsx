import React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Editor from "./components/editor/Editor";
import Inspector from "./components/inspector/Inspector";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/Header";
import { Global } from "@emotion/core";
import { EditorProvider } from "./contexts/EditorContext";

export const COMPONENTS: ComponentType[] = [
  "Avatar",
  "AvatarBadge",
  "AvatarGroup",
  "Badge",
  "Box",
  "Button",
  "Checkbox",
  "CircularProgress",
  "CloseButton",
  "Code",
  "Divider",
  "Heading",
  "Icon",
  "IconButton",
  "Image",
  "Link",
  "Progress",
  "SimpleGrid",
  "Switch",
  "Spinner",
  "TextArea",
  "Tag",
  "Text",
  "TextArea",
  "Alert",
  "AlertIcon",
  "AlertTitle",
  "AlertDescription"
];

const App = () => (
  <DndProvider backend={Backend}>
    <Global
      styles={() => ({
        "*": { borderBox: "box-sizing" }
      })}
    />

    <Header />

    <Flex minHeight="calc(100vh - 3rem)">
      <Box bg="white" flex={1} zIndex={10} position="relative">
        <EditorProvider>
          <Editor />
        </EditorProvider>
      </Box>

      <Sidebar />

      <Box
        maxH="calc(100vh - 3rem)"
        flex="0 0 15rem"
        roundedRight={10}
        bg="#f7fafc"
        overflowY="scroll"
        borderLeft="1px solid #cad5de"
      >
        <Inspector />
      </Box>
    </Flex>
  </DndProvider>
);

export default App;
