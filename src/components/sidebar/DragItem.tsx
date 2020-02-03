import React from "react";
import { useDrag } from "react-dnd";
import { Text, PseudoBox, Icon } from "@chakra-ui/core";

const DragItem: React.FC<ComponentItemProps> = ({ id, type }) => {
  const [, drag] = useDrag({
    item: { id, type }
  });

  return (
    <PseudoBox
      boxSizing="border-box"
      transition="margin 200ms"
      _hover={{
        ml: -1,
        mr: 1,
        bg: "teal.100",
        shadow: "sm",
        color: "teal.800"
      }}
      my={1}
      color="whiteAlpha.800"
      rounded="md"
      p={1}
      cursor="move"
      ref={drag}
      display="flex"
      alignItems="center"
    >
      <Icon
        fontSize="xs"
        mr={2}
        name="drag-handle"
        onClick={() => {
          window.open(`https://chakra-ui.com/${type}`, "_blank");
        }}
      />
      <Text letterSpacing="wide" fontSize="sm" textTransform="capitalize">
        {type}
      </Text>
    </PseudoBox>
  );
};

export default DragItem;
