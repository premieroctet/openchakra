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

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <DarkMode>
      <Box
        shadow="xl"
        flex="0 0 14rem"
        p={5}
        m={0}
        overflowY="auto"
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
            placeholder="Search component…"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
          />
        </InputGroup>

        {COMPONENTS.filter(c => c.includes(searchTerm)).map(component => (
          <DragItem name={component} type={component as ComponentType}>
            {component}
          </DragItem>
        ))}
      </Box>
    </DarkMode>
  );
};

export default memo(Menu);
