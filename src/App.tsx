import React from "react";
import { Flex, Box, LightMode } from "@chakra-ui/core";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Editor from "./components/editor/Editor";
import Inspector from "./components/inspector/Inspector";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/Header";
import { Global } from "@emotion/core";

export const COMPONENTS: ComponentType[] = [
  "Box",
  "Checkbox",
  "Button",
  "Image",
  "Badge",
  "Icon",
  "Text",
  "Progress",
  "Avatar",
  "Link",
  "AvatarGroup",
  "AvatarBadge",
  "IconButton",
  "Spinner",
  "CloseButton",
  "Divider",
  "Code"
];

const App = () => (
  <LightMode>
    <DndProvider backend={Backend}>
      <Global
        styles={() => ({
          "*": { borderBox: "box-sizing" }
        })}
      />

      <Header />

      <Flex minHeight="calc(100vh - 3rem)">
        <Box bg="white" flex={1} zIndex={10} position="relative">
          <Editor />
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
  </LightMode>
);

export default App;
