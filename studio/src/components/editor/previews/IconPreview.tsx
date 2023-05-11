import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'
import theme from '~dependencies/theme/theme'
import {iconStuff} from '~utils/misc' 

interface Props {
  component: IComponent
}

export function whatTheHexaColor(color: string) {
  const colorArray = typeof color === 'string' && color?.split('.') || color
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

    const {IconFromSet, iconProps} = iconStuff({icon, dataLib: props?.['data-lib'], color: hexaColor, size: boxSize })

    if (IconFromSet) {
      return (
        <Box {...props} display="inline" ref={drop(ref)} >
          {IconFromSet && <IconFromSet {...iconProps} {...props} />}
       </Box>
      )
    }
  }

  return null
}

export default IconPreview
