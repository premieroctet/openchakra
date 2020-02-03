import React from "react";
import { Link, Box, Flex, IconButton } from "@chakra-ui/core";

import Panels from "./panels/Panels";
import { GoRepo } from "react-icons/go";
import { FaMagic } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { RootState } from "../..";
import { useSelector } from "react-redux";
import useDispatch from "../../hooks/useDispatch";
import QuickPropsPanel from "./QuickPropsPanel";
import StylesPanel from "./panels/StylesPanel";
import { Tooltip } from "@chakra-ui/core";

const Inspector = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.app.selectedId);
  const component = useSelector(
    (state: RootState) => state.app.components[selectedId]
  );

  if (selectedId === "root" || !component) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        height="100%"
        textAlign="center"
        color="gray.400"
        px={4}
      >
        <Box mb={4} color="gray.300" as={FaMagic} fontSize="6xl" />
        Select an element on the editor to activate this panel
      </Flex>
    );
  }

  const { type } = component;

  return (
    <>
      <Box bg="white">
        <Box
          fontWeight="semibold"
          fontSize="md"
          color="yellow.900"
          rounded="md"
          py={2}
          px={2}
          shadow="sm"
          bg="yellow.100"
          mb={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {type}
          <Box>
            <Tooltip hasArrow aria-label="Reset" label="Reset">
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="Reset"
                onClick={() => dispatch.app.resetProps(component.id)}
                icon={IoMdRefresh}
              />
            </Tooltip>
            <Tooltip hasArrow aria-label="Doc" label="Doc">
              <IconButton
                size="xs"
                variant="ghost"
                as={Link}
                onClick={() => {
                  window.open(
                    `https://chakra-ui.com/${type.toLowerCase()}`,
                    "_blank"
                  );
                }}
                aria-label="Doc"
                icon={GoRepo}
              />
            </Tooltip>
            <Tooltip bg="red.500" hasArrow aria-label="Remove" label="Remove">
              <IconButton
                size="xs"
                variant="ghost"
                onClick={() => dispatch.app.deleteComponent(component.id)}
                aria-label="Remove"
                icon={FiTrash2}
              />
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Box bg="white" px={3}>
        <QuickPropsPanel />
        <Panels component={component} />
      </Box>

      <StylesPanel />
    </>
  );
};

export default Inspector;
