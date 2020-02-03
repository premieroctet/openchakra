import React, { useState, ChangeEvent, memo } from "react";
import {
  Box,
  Input,
  InputGroup,
  Icon,
  InputRightElement,
  DarkMode
} from "@chakra-ui/core";
import DragItem from "./DragItem";
import { COMPONENTS } from "../../App";

const TYPES_SOON: ComponentType[] = [
  "AspectRatioBox",
  "Accordion",
  "AccordionItem",
  "AccordionHeader",
  "AccordionPanel",
  "AccordionIcon",
  "Tab",
  "Tabs",
  "TabList",
  "TabPanel",
  "TabPanels",
  "Breadcrumb",
  "Radio",
  "ControlBox",
  "Menu",
  "NumberInput",
  "Select",
  "Editable"
];

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <DarkMode>
      <Box
        maxH="calc(100vh - 3rem)"
        overflowY="auto"
        overflowX="visible"
        shadow="xl"
        flex="0 0 14rem"
        p={5}
        m={0}
        as="menu"
        backgroundColor="#2e3748"
        width="15rem"
        order={-1}
      >
        <InputGroup size="sm" mb={2}>
          <InputRightElement
            children={<Icon name="search" color="gray.300" />}
          />
          <Input
            color="gray.300"
            placeholder="Search component…"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
          />
        </InputGroup>

        {COMPONENTS.filter(c =>
          c.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(type => (
          <DragItem
            soon={TYPES_SOON.includes(type)}
            key={type}
            id={type}
            type={type as ComponentType}
          >
            {type}
          </DragItem>
        ))}
      </Box>
    </DarkMode>
  );
};

export default memo(Menu);
