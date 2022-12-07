import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import icons from '~iconsList'
import { Box } from '@chakra-ui/react'

interface Props {
  component: IComponent
}

const IconPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const {
    props: { color, boxSize, icon, ...props },
  } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  if (icon) {
    if (Object.keys(icons).includes(icon)) {
      const Icon = icons[icon as keyof typeof icons]
      return (
        <Box {...props} display="inline">
          <Icon path="" color={color} boxSize={boxSize} />
        </Box>
      )
    }
    return null
  }

  return null
}

export default IconPreview
