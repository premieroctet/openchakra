import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'
import {iconStuff} from '~utils/misc' 

interface Props {
  component: IComponent
}


const IconPreview = ({ component }: Props) => {
  const { drop, isOver } = useDropComponent(component.id)
  const {
    props: { color, boxSize, icon, fill, ...props },
    ref
  } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  if (icon) {

    const {IconFromSet, iconProps} = iconStuff({icon, dataLib: props?.['data-lib'], color, fill, size: boxSize })

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
