import React from 'react'
import { Box } from '@chakra-ui/core'
import ChildElement from './ChildElement'

interface Props {
  childrenList: IComponent[]
  moveItem: (fromIndex: number, toIndex: number) => void
  onSelect: (id: IComponent['id']) => void
}

const ChildrenList: React.FC<Props> = ({
  childrenList,
  moveItem,
  onSelect,
}) => {
  return (
    <Box mx={2} h="100%">
      {childrenList.map(
        (child, index) =>
          child && (
            <ChildElement
              key={child.id}
              type={child.type}
              index={index}
              moveItem={moveItem}
              id={child.id}
              onSelect={onSelect}
            />
          ),
      )}
    </Box>
  )
}

export default ChildrenList
