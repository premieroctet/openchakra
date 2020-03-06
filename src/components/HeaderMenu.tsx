import React, { memo } from 'react'
import {
  Box,
  Button,
  LightMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  LinkProps,
  MenuItemProps,
  MenuButtonProps,
  ButtonProps,
} from '@chakra-ui/core'
import useDispatch from '../hooks/useDispatch'
import { loadFromJSON, saveAsJSON } from '../utils/import'
import { useSelector } from 'react-redux'
import { getComponents } from '../core/selectors/components'
import { FaBomb, FaSave } from 'react-icons/fa'
import { GoRepo } from 'react-icons/go'
import { FiUpload } from 'react-icons/fi'

type MenuItemLinkProps = MenuItemProps | LinkProps

// Ignore because of AS typing issues
// @ts-ignore
const MenuItemLink: React.FC<MenuItemLinkProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLLinkElement>) => {
    // @ts-ignore
    return <MenuItem ref={ref} as="a" {...props} />
  },
)

// @ts-ignore
const CustomMenuButton: React.FC<
  MenuButtonProps | ButtonProps
> = React.forwardRef((props, ref: React.Ref<HTMLLinkElement>) => {
  // @ts-ignore
  return <MenuButton as={Button} {...props} />
})

const ExportMenuItem = () => {
  const components = useSelector(getComponents)

  return (
    <MenuItem onClick={() => saveAsJSON(components)}>
      <Box mr={2} as={FaSave} />
      Save components
    </MenuItem>
  )
}
const HeaderMenu = () => {
  const dispatch = useDispatch()

  return (
    <Menu>
      <CustomMenuButton
        rightIcon="chevron-down"
        as={Button}
        size="xs"
        variant="ghost"
        variantColor="gray"
      >
        Editor
      </CustomMenuButton>
      <LightMode>
        <MenuList zIndex={100}>
          <ExportMenuItem />
          <MenuItem
            onClick={async () => {
              const components = await loadFromJSON()
              dispatch.components.reset(components)
            }}
          >
            <Box mr={2} as={FiUpload} />
            Import components
          </MenuItem>

          <MenuDivider />

          <MenuItemLink isExternal href="https://chakra-ui.com/getting-started">
            <Box mr={2} as={GoRepo} />
            Chakra UI Docs
          </MenuItemLink>
          <MenuItemLink href="https://github.com/premieroctet/openchakra/issues">
            <Box mr={2} as={FaBomb} />
            Report issue
          </MenuItemLink>
        </MenuList>
      </LightMode>
    </Menu>
  )
}

export default memo(HeaderMenu)
