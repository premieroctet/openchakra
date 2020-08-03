import React, { memo } from 'react'
import dynamic from 'next/dynamic'
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
import { FaBomb } from 'react-icons/fa'
import { GoRepo } from 'react-icons/go'

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

const ExportMenuItem = dynamic(() => import('./ExportMenuItem'), { ssr: false })
const ImportMenuItem = dynamic(() => import('./ImportMenuItem'), { ssr: false })

const HeaderMenu = () => {
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
          <ImportMenuItem />

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
