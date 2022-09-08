import React from 'react'
import {
  Avatar,
  AvatarGroup,
  Box,
  AvatarBadge,
  BoxProps,
} from '@chakra-ui/react'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'
import { useSelector } from 'react-redux'
import { getComponents } from '~core/selectors/components'

const AvatarPreview: React.FC<IPreviewProps & {
  spacing?: BoxProps['marginLeft']
  index: number
}> = ({ component, spacing, index }) => {
  const { drop, isOver } = useDropComponent(component.id, index, [
    'AvatarBadge',
  ])
  const { props, ref } = useInteractive(component, index)

  let boxProps: any = {
    display: 'inline-block',
    zIndex: index ? 20 - index : null,
  }

  props.p = 0

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} index={index} {...boxProps}>
      <Avatar ml={index === 0 ? 0 : spacing} {...props}>
        {component.children.map((key, i) => (
          <ComponentPreview key={key} index={i} componentName={key} />
        ))}
      </Avatar>
    </Box>
  )
}

export const AvatarGroupPreview = ({ component, index }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, index, true)
  const { drop, isOver } = useDropComponent(component.id, index, ref, [
    'Avatar',
  ])
  const components = useSelector(getComponents)
  let boxProps: any = { display: 'inline' }

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} index={index} {...boxProps}>
      <AvatarGroup {...props}>
        {component.children.map((key, i) => (
          <AvatarPreview
            key={key}
            index={i + 1}
            spacing={props.spacing}
            component={components[key]}
          />
        ))}
      </AvatarGroup>
    </Box>
  )
}

export const AvatarBadgePreview = ({ component, index }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, index)
  let boxProps: any = {}

  return (
    <Box {...boxProps} index={index} ref={ref}>
      <AvatarBadge {...props} />
    </Box>
  )
}

export default AvatarPreview
