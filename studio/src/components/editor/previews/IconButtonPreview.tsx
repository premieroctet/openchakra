import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { IconButton } from '@chakra-ui/react'
import {iconStuff} from '~utils/misc' 

interface Props {
  component: IComponent
}

const IconButtonPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const {
    props: { icon, fill, ...props },
    ref,
  } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  if (icon) {

    const {IconFromSet, iconProps} = iconStuff({icon, fill, dataLib: props?.['data-lib'] })

    if (IconFromSet) {
      return <IconButton ref={ref} icon={<IconFromSet {...iconProps} />} {...props} />
    }
  }

  return null
}

export default IconButtonPreview
