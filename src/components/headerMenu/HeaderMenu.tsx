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
  Portal,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FaBomb } from 'react-icons/fa'
import { GoRepo, GoArchive } from 'react-icons/go'

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
    <Menu placement="bottom">
      <CustomMenuButton
        rightIcon={<ChevronDownIcon path="" />}
        size="xs"
        variant="ghost"
        colorScheme="gray"
      >
        Editor
      </CustomMenuButton>
      <Portal>
        <LightMode>
          <MenuList bg="white" zIndex={999}>
            {process.env.NEXT_PUBLIC_IS_V0 && (
              <MenuItemLink isExternal href="https://v0.openchakra.app">
                <Box mr={2} as={GoArchive} />
                Chakra v0 Editor
              </MenuItemLink>
            )}
            <ExportMenuItem />
            <ImportMenuItem />

            <MenuDivider />

            <MenuItemLink
              isExternal
              href="https://chakra-ui.com/getting-started"
            >
              <Box mr={2} as={GoRepo} />
              Chakra UI Docs
            </MenuItemLink>
            <MenuItemLink href="https://github.com/premieroctet/openchakra/issues">
              <Box mr={2} as={FaBomb} />
              Report issue
            </MenuItemLink>
          </MenuList>
        </LightMode>
      </Portal>
    </Menu>
  )
}

export default memo(HeaderMenu)
