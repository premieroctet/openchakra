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
  index?: number
}> = ({ component, spacing, index }) => {
  const { drop, isOver } = useDropComponent(component.id, ['AvatarBadge'])
  const { props, ref } = useInteractive(component)

  let boxProps: any = {
    display: 'inline-block',
    zIndex: index ? 20 - index : null,
  }

  props.p = 0

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Avatar ml={index === 0 ? 0 : spacing} {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Avatar>
    </Box>
  )
}

export const AvatarGroupPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, ['Avatar'])
  const components = useSelector(getComponents)
  let boxProps: any = { display: 'inline' }

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <AvatarGroup {...props}>
        {component.children.map((key: string, i: number) => (
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

export const AvatarBadgePreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component)
  let boxProps: any = {}

  return (
    <Box {...boxProps} ref={ref}>
      <AvatarBadge {...props} />
    </Box>
  )
}

export default AvatarPreview
