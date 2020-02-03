import React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Editor from "./components/editor/Editor";
import Inspector from "./components/inspector/Inspector";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/Header";
import { Global } from "@emotion/core";
import { HotKeys } from "react-hotkeys";
import useDispatch from "./hooks/useDispatch";
import { useSelector } from "react-redux";
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { RootState } from ".";

export const COMPONENTS: ComponentType[] = [
  "Alert",
  "AlertDescription",
  "AlertIcon",
  "AlertTitle",
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
  "Flex",
  "FormControl",
  "FormLabel",
  "FormHelperText",
  "FormErrorMessage",
  "Heading",
  "Icon",
  "IconButton",
  "Image",
  "Input",
  "Link",
  "Progress",
  "SimpleGrid",
  "Spinner",
  "Stack",
  "Switch",
  "Tag",
  "Text",
  "Textarea",
  "Tab",
  "Accordion",
  "Select",
  "ControlBox",
  "Editable",
  "AspectRatioBox",
  "Breadcrumb",
  "Menu",
  "NumberInput",
  "Radio"

  /*"AccordionItem",
  "AccordionHeader",
  "AccordionPanel",
  "AccordionIcon",*/
  /*"Tabs",
  "TabList",
  "TabPanel",
  "TabPanels"*/
];

export const rootComponents = COMPONENTS.filter(
  name =>
    !["AlertIcon", "AlertDescription", "AlertTitle", "AvatarBadge"].includes(
      name
    )
);

const keyMap = {
  DELETE_NODE: "backspace",
  TOGGLE_BUILDER_MODE: "b",
  TOGGLE_CODE_PANEL: "c",
  UNDO: "ctrl+z",
  REDO: "ctrl+y",
};

const App = () => {
  const selected = useSelector((state: RootState) => state.app.selected);
  const dispatch = useDispatch();

  const deleteNode = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault();
    }

    if (selected) {
      dispatch.components.deleteComponent(selected.name);
    }
  };

  const toggleBuilderMode = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault();
    }
    dispatch.app.toggleBuilderMode();
  };

  const toggleCodePanel = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault();
    }
    dispatch.app.toggleCodePanel();
  };

  const undo = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault();
    }

    dispatch(UndoActionCreators.undo());
  };

  const redo = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault();
    }

    dispatch(UndoActionCreators.redo());
  };

  const handlers = {
    DELETE_NODE: deleteNode,
    TOGGLE_BUILDER_MODE: toggleBuilderMode,
    TOGGLE_CODE_PANEL: toggleCodePanel,
    UNDO: undo,
    REDO: redo,
  };

  return (
    <HotKeys allowChanges handlers={handlers} keyMap={keyMap}>
      <Global
        styles={() => ({
          "*": { borderBox: "box-sizing" }
        })}
      />
      <Header />

      <DndProvider backend={Backend}>
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
            overflowY="auto"
            overflowX="visible"
            borderLeft="1px solid #cad5de"
          >
            <Inspector />
          </Box>
        </Flex>
      </DndProvider>
    </HotKeys>
  );
};

export default App;
