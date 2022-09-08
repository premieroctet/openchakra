import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import icons from '~iconsList'
import { IconButton } from '@chakra-ui/react'

const IconButtonPreview = ({ component, index }: IPreviewProps) => {
  const {
    props: { icon, ...props },
    ref,
  } = useInteractive(component, index, true)
  const { isOver } = useDropComponent(component.id, index, ref)

  if (isOver) {
    props.bg = 'teal.50'
  }

  if (icon) {
    if (Object.keys(icons).includes(icon)) {
      const Icon = icons[icon as keyof typeof icons]

      return (
        <IconButton
          ref={ref}
          icon={<Icon path="" />}
          {...props}
          index={index}
        />
      )
    }
    return null
  }

  return null
}

export default IconButtonPreview
