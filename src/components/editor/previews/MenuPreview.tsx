import React from 'react'
import { useInteractive } from '../../../hooks/useInteractive'
import { useDropComponent } from '../../../hooks/useDropComponent'
import {
  Box,
  Menu,
  MenuList,
  MenuButton,
  MenuGroup,
  MenuItem,
} from '@chakra-ui/core'
import ComponentPreview from '../ComponentPreview'
import { MenuWhitelist } from '../../../utils/editor'

const acceptedTypes = ['MenuButton', 'MenuList'] as ComponentType[]

const MenuPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...props}>
      <Menu {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Menu>
    </Box>
  )
}

export const MenuListPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, MenuWhitelist)

  if (isOver) {
    props.bg = 'teal.50'
  }

  let boxProps: any = {}

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <MenuList {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </MenuList>
    </Box>
  )
}

export const MenuButtonPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, MenuWhitelist)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <MenuButton ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </MenuButton>
  )
}

export const MenuItemPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, MenuWhitelist)

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <MenuItem {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </MenuItem>
    </Box>
  )
}

export const MenuGroupPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, MenuWhitelist)

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <MenuGroup {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </MenuGroup>
    </Box>
  )
}

export default MenuPreview
