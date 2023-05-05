import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import lucidicons from '~lucideiconsList'
import icons from '~iconsList'
import { Box } from '@chakra-ui/react'
import theme from '~dependencies/theme/theme'

interface Props {
  component: IComponent
}

export function whatTheHexaColor(color: string) {
  const colorArray = color?.split('.') || color
  const isChakraTint = colorArray?.[1] // get the tint
  
  let retainedColor = colorArray?.[0]

  if (isChakraTint) {
    retainedColor = theme.colors[retainedColor][isChakraTint]
  }

  return retainedColor
}

const IconPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const {
    props: { color, boxSize, icon, ...props },
  } = useInteractive(component, true)

  const hexaColor = whatTheHexaColor(color)

  if (isOver) {
    props.bg = 'teal.50'
  }

  if (icon) {
    if (Object.keys(icons).includes(icon)) {
      const Icon = icons[icon as keyof typeof icons]
      return (
        <Box {...props} display="inline-block" >
          <Icon path="" color={hexaColor} boxSize={boxSize} />
        </Box>
      )
    }
    return null
  }

  return null
}

export default IconPreview
