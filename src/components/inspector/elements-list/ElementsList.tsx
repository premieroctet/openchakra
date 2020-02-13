import React from 'react'
import { Box } from '@chakra-ui/core'
import ElementListItem from './ElementListItemDraggable'

interface Props {
  elements: IComponent[]
  moveItem: (fromIndex: number, toIndex: number) => void
  onSelect: (id: IComponent['id']) => void
  onHover: (id: IComponent['id']) => void
  onUnhover: () => void
}

const ElementsList: React.FC<Props> = ({
  elements,
  moveItem,
  onSelect,
  onHover,
  onUnhover,
}) => {
  return (
    <Box mx={2} h="100%">
      {elements.map(
        (element, index) =>
          element && (
            <ElementListItem
              key={element.id}
              type={element.type}
              index={index}
              moveItem={moveItem}
              id={element.id}
              onSelect={onSelect}
              onHover={onHover}
              onUnhover={onUnhover}
            />
          ),
      )}
    </Box>
  )
}

export default ElementsList
