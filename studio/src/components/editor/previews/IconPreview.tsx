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
  const { drop, isOver } = useDropComponent(component.id)
  const {
    props: { color, boxSize, icon, ...props },
    ref
  } = useInteractive(component, true)

  const hexaColor = whatTheHexaColor(color)

  if (isOver) {
    props.bg = 'teal.50'
  }

  if (icon) {

    let Icon, iconProps = null
    
    const libIcon = props?.['data-lib']

    switch (libIcon) {
      case 'lucid':
        if (Object.keys(lucidicons).includes(icon)) {
          Icon = lucidicons[icon as keyof typeof icons]
          iconProps = {color: hexaColor, size: boxSize}
        }
      break;
        
      // Chakra Icons by default
      default:
        if (Object.keys(icons).includes(icon)) {
          Icon = icons[icon as keyof typeof icons]
          iconProps = {color: hexaColor, boxSize: boxSize, path: ""}
        }
      break;
    }

    return (
      <Box {...props} display="inline-block" ref={drop(ref)} >
        {Icon && <Icon {...iconProps}/>}
     </Box>
    )

  }

  return null
}

export default IconPreview
